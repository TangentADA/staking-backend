import { PrismaClient } from '@prisma/client';
import { Assets, Blockfrost, C, Lucid, Network, Tx, TxComplete, Unit, UTxO, utxoToCore } from 'lucid-cardano';
import dotenv from 'dotenv';
import sample from 'lodash.sample'
import stakingpools from '../resources/stakingPools.js'
import { addAssets, subAssetsFromUtxos, divideAssetsBy2 } from '../util/sc.js'
import { dbFromPool } from '../util/snapshot.js'
dotenv.config();

const BLOCKFROST_URL = process.env.BLOCKFROST_URL
const BLOCKFROST_KEY = process.env.BLOCKFROST_API_KEY
const NETWORK = process.env.BLOCKFROST_NETWORK

if (!BLOCKFROST_URL || !BLOCKFROST_KEY || !NETWORK) {
  throw 'Environment variables not set'
}

type RewardReqBody = {
  poolIndex: number,
  address: string
}

const pendingRewards = async (prisma: PrismaClient, body: string) => {
    const parsedBody: RewardReqBody = JSON.parse(body)
    let poolI = parsedBody.poolIndex
    let address = parsedBody.address
    const poolargs = stakingpools[poolI]

    let pool = await prisma.pool.findFirst({
        where: {
            poolIndex: poolI
        }
    })
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

        let epochRatio = delta/432000000
        let updatePay = Math.floor(epochRatio*(poolargs.poolInfo.rewardPerEpochQt))
        let valueAdded: Assets = {}
        valueAdded[poolargs.poolInfo.harvestUnit] = BigInt(updatePay)

        await dbFromPool(poolI, poolargs, valueAdded)
    } else {
        console.log("We are not updating, just paying.")
        console.log(Date.now() - lastUpdate.valueOf())
    }

    if (!address) throw "No address provided for staker." // return res.status(400).json(`Stakers address not provided.`)
    let addr = address.toString()
    console.log(addr);
    const pkh = C.Address.from_bech32(addr).as_base()?.payment_cred().to_keyhash()?.to_hex();
    console.log(pkh)

    let user = await prisma.snapshot.findFirst({
        where: {
        keyhash: pkh,
        poolId: pool.id
        }
    })

    if (!user) throw "There are no tokens present" // return res.status(400).json("You have no tokens to claim.")

    let assets = await prisma.asset.findMany({
        where: {
        snapshotId: user.id
        }
    })
    let payout = 0n;

    assets.forEach((a:any) => {
        if (a.unitUnit == poolargs.poolInfo.harvestUnit) {
        payout += a.value
        }
    });
    return {pendingRewards: payout.toString()}
}

export { pendingRewards }