import { PrismaClient } from '@prisma/client';
import { Assets, Blockfrost, C, Lucid, Network, Tx, TxComplete, Unit, UTxO, utxoToCore } from 'lucid-cardano';
import dotenv from 'dotenv';
import sample from 'lodash.sample'
import stakingPools from '../resources/constants/stakingPools.js'
import { addAssets, subAssetsFromUtxos, divideAssetsBy2 } from '../util/sc.js'
import { dbFromPool } from '../util/snapshot.js'
dotenv.config();

const BLOCKFROST_URL = process.env.BLOCKFROST_URL
const BLOCKFROST_KEY = process.env.BLOCKFROST_API_KEY
const NETWORK = process.env.BLOCKFROST_NETWORK

if (!BLOCKFROST_URL || !BLOCKFROST_KEY || !NETWORK) {
  throw 'Environment variables not set'
}

type HarvestReqBody = [{
  poolIndex: number,
  address: string
}]

const harvestCtrl = async (prisma: PrismaClient, body: string) => {

  const parsedBody: HarvestReqBody = JSON.parse(body)
  console.log(parsedBody)
  const harvestTxRes = await Promise.all(parsedBody.map(async (harvestReq) => {
    return await harvestTX(prisma, harvestReq);
  }));
  console.log(harvestTxRes)

}

const harvestTX = async (prisma: PrismaClient, harvestReq: any) => {

  let poolIndex = harvestReq.poolIndex
  let address = harvestReq.address
  console.log(poolIndex)
  console.log(address)


  const poolI = Number(poolIndex) //: -1
  if (poolI == -1) return { error: "Failed, pool doesn't exist in db." }

  const poolargs = stakingPools[poolI]

  const lucid = await Lucid.new(
      new Blockfrost(BLOCKFROST_URL, BLOCKFROST_KEY),
      NETWORK as Network
  )
  let pool;
  console.log(`PoolI: ${poolI}`)
  try {
    pool = await prisma.pool.findFirst({
      where: {
        poolIndex: poolI
      }
    })
  } catch (e) {
    console.log("New pool being created in db.")
    console.log(e)
  }
  if (!pool) {
    pool = await prisma.pool.create({
      data: {
        poolIndex: poolI
      }
    });
  }

  let lastUpdate: Date = pool.updatedAt
  if (lastUpdate.valueOf() + 300000 < Date.now()) {
    let delta = Date.now() - lastUpdate.valueOf()
    await prisma.pool.update({
      where: {
        id: pool.id
      },
      data: {
        updatedAt: new Date()
      }
    })

    let epochRatio = delta / 432000000
    let updatePay = Math.floor(epochRatio * (poolargs.poolInfo.rewardPerEpochQt))
    let valueAdded: Assets = {}
    valueAdded[poolargs.poolInfo.harvestUnit] = BigInt(updatePay)

    await dbFromPool(poolI, poolargs, valueAdded)
  }

  if (!address) return { error: "Stakers address not provided." }
  let addr = address.toString()
  let pkh = C.Address.from_bech32(addr).as_base()?.payment_cred().to_keyhash()?.to_hex();
  if (!pkh) return { error: "Invalid pkh." }

  let pastTransactions = await prisma.validTx.findMany({
    where: {
      keyhash: pkh
    }
  })
  let pastTransaction;
  if (pastTransactions) {
    pastTransactions = pastTransactions.filter((pastTx) => {
      return pastTx.updatedAt.valueOf() + 600000 > (new Date().valueOf())
    })
  }
  if (pastTransactions && pastTransactions.length != 0) {
    pastTransaction = pastTransactions[0].txHash
  }

  let user = await prisma.snapshot.findFirst({
    where: {
      keyhash: pkh,
      poolId: pool.id
    }
  })

  if (!user) return { error: "No tokens for this user to claim." }

  let assets = await prisma.asset.findMany({
    where: {
      snapshotId: user.id
    }
  })
  let payout = 0n;

  assets.forEach((a: any) => {
    if (a.unitUnit == poolargs.poolInfo.harvestUnit) {
      payout += BigInt(a.value)
    }
  });
  let payOut: Assets = {}
  payOut[poolargs.poolInfo.harvestUnit] = payout;
  console.log(addr)
  let userUtxos = await lucid.utxosAt(addr)
  // TODO - We may want to handle UTxO management better here to balance them out over time with a certain target number.
  console.log(userUtxos)
  userUtxos = userUtxos.filter((u) => {
    return BigInt(u.assets['lovelace'].toString()) > 2000000n
  })
  console.log(userUtxos)
  let userUtxo = sample(userUtxos)
  if (!userUtxo) throw ""
  console.log(userUtxo.assets)

  await lucid.selectWalletFrom({ address: addr })
  console.log(poolargs.poolInfo.distAddress)

  let beUtxos = await lucid.utxosAtWithUnit(poolargs.poolInfo.distAddress, poolargs.poolInfo.harvestUnit)
  let beLength = beUtxos.length
  console.log(`Length of beUtxos: ${beLength}`)
  let beUtxo: UTxO | undefined = undefined;
  for (let it = 0; it < beUtxos.length; it++) {
    let u = beUtxos[it]
    let taken = await prisma.takenTxO.findFirst({
      where: {
        txHash: u.txHash.toString(),
        index: u.outputIndex,
      }
    })
    if (!taken) {
      taken = await prisma.takenTxO.create({
        data: {
          txHash: u.txHash.toString(),
          index: u.outputIndex,
        }
      })
      beUtxo = u;
      break;
    } else {
      let takenUpdated: Date = taken.updatedAt
      if (takenUpdated.valueOf() + 90000 < Date.now()) {
        beUtxo = u;
        break;
      }
    }
  }

  console.log(`User utxo: ${userUtxo} | Back-End UTxO: ${beUtxo}`)

  if (!userUtxo || !beUtxo) {
    return { error: "Invalid UTxO set, if this problem persists, please contact ADAO via discord." }
  }
  let distPayback = subAssetsFromUtxos([beUtxo], payOut)
  distPayback = addAssets(distPayback, { 'lovelace': 10000n })

  let tx: any = lucid.newTx()
      .collectFrom([userUtxo, beUtxo])

  if (beLength < 10) { // Note: if statement was commented out when testing successfully with ADAO (only else statement) got triggered
    let splitAssets = divideAssetsBy2(distPayback)
    tx = tx.payToAddress(poolargs.poolInfo.distAddress, splitAssets[0])
    tx = tx.payToAddress(poolargs.poolInfo.distAddress, splitAssets[1])
  } else {
    tx = tx.payToAddress(poolargs.poolInfo.distAddress, distPayback)
  }
  let now = new Date().valueOf()
  let slot = lucid.utils.unixTimeToSlot(now + 180000)
  tx.txBuilder.set_ttl(C.BigNum.from_str(slot.toString()));
  tx = await tx.complete()
  let sTx = Buffer.from(tx.txComplete.to_bytes(), 'hex')
  let t = C.Transaction.from_bytes(sTx)
  const txBodyHash = C.hash_transaction(t.body());
  if (pastTransaction && pastTransaction != txBodyHash.to_hex()) {
    throw "Too many transactions built for this user in 5 minute period of time, please wait."
  }
  try {
    await prisma.validTx.create({
      data: {
        txHash: Buffer.from(txBodyHash.to_bytes()).toString('hex'),
        keyhash: pkh
      }
    })
  } catch { console.log('tx already exists') }
  console.log(sTx.toString('hex'))
  return { txHex: sTx.toString('hex') }
}

export { harvestCtrl, HarvestReqBody }