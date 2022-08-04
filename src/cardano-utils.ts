import { PrismaClient } from '@prisma/client';
import { Blockfrost, C, Lucid, Network } from 'lucid-cardano'

type SubmitReqBody = {
    poolIndex: number
    address: string
    txHex: string
    signatureHex: string
}


const initLucid = async () => {
    if (!process.env.BLOCKFROST_URL || !process.env.BLOCKFROST_API_KEY || !process.env.BLOCKFROST_NETWORK)
        throw 'BLOCKFROST_URL and/or BLOCKFROST_API_KEY environment variables not set'

    return await Lucid.new(
        new Blockfrost(process.env.BLOCKFROST_URL, process.env.BLOCKFROST_API_KEY),
        process.env.BLOCKFROST_NETWORK as Network
    )
}

const submitJob = async (prisma: PrismaClient, submitReqBody: string) => {
    if (!process.env.SERVER_PRIVKEY) throw "SERVER_PRIVKEY env variable not set"

    //Validate and parse request body
    const { transaction, signatureList, signatureSet, address, poolI } = parseSubmitBody(submitReqBody)
    if (!address) throw "Address not provided."

    //Create txbodyHash
    const transaction_body = transaction.body();
    const txBodyHash = C.hash_transaction(transaction_body);

    //custom validation
    let validated = await validate(prisma, Buffer.from(txBodyHash.to_hex(), 'hex').toString())
    if (!validated) throw "The Transaction provided is not valid!!"

    //Create private key for server
    const serverKey = process.env.SERVER_PRIVKEY
    const sKey = C.PrivateKey.from_bech32(serverKey)

    // make tx witness with server key
    const witness = C.make_vkey_witness(
        txBodyHash,
        sKey
    );

    signatureList.add(witness);
    signatureSet.set_vkeys(signatureList);

    //copy native scripts from intial tx
    const txNativeScripts = transaction.witness_set().native_scripts()
    if (txNativeScripts) signatureSet.set_native_scripts(txNativeScripts)

    // copy metadata from intial tx
    const aux = C.AuxiliaryData.new()
    const txMetadata = transaction.auxiliary_data()?.metadata()

    //assemble the tx with witnesses and metadata
    let signedTx;
    if (txMetadata) {
        aux.set_metadata(txMetadata)
        signedTx = C.Transaction.new(transaction.body(), signatureSet, aux)
    } else {
        signedTx = C.Transaction.new(transaction.body(), signatureSet)
    }

    //init lucid and use provider to submit
    const lib = await initLucid()
    try {
        const resF = await lib.provider.submitTx(signedTx)

        await removeUsersAssetsFromDB(prisma, address, poolI)

        //if returns txHash, return it, otherwise error
        //TODO: better check would be nice
        if (resF && resF.length === 64) return { transactionId: resF }
    } catch (err) {
        console.log(err)
    }

    throw 'Failed to submit'
}

const removeUsersAssetsFromDB = async (prisma: PrismaClient, address: string, poolI: number) => {
    let addr = address.toString()
    const pkh = C.Address.from_bech32(addr).as_base()?.payment_cred().to_keyhash()?.to_hex();

    const pool = await prisma.pool.findFirst({
        where: {
            poolIndex: poolI
        }
    })
    if (!pool) {
        throw "The pool used is not valid."
    }

    const user = await prisma.snapshot.findFirst({
        where: {
            keyhash: pkh,
            poolId: pool.id
        }
    })

    const assets = await prisma.asset.findMany({
        where: {
            snapshotId: user?.id
        }
    })

    for (let it = 0; it < assets.length; it++) {
        let asset = assets[it]
        await prisma.asset.delete({
            where: {
                id: asset.id
            }
        })
    }
}

function parseSubmitBody(submitReqBody: string) {
    const parsedBody: SubmitReqBody = JSON.parse(submitReqBody)
    let transaction
    try {
        transaction = C.Transaction.from_bytes(Buffer.from(parsedBody.txHex, 'hex'))
    } catch {
        transaction = undefined
    }
    if (!transaction)
        throw "Couldn't parse the transaction"

    let signatureSet
    try {
        signatureSet = C.TransactionWitnessSet.from_bytes(Buffer.from(parsedBody.signatureHex, 'hex'))
    } catch {
        signatureSet = undefined
    }
    if (!signatureSet)
        throw "Couldn't parse the signature"

    const signatureList = signatureSet.vkeys()

    if (!signatureList)
        throw "User signature invalid."
    const address = parsedBody.address
    const poolI = parsedBody.poolIndex

    return { transaction, signatureList, signatureSet, address, poolI}
}

//write custom validation
const validate = async (prisma: PrismaClient, txHash: string) => {
    const validTx = await prisma.validTx.findFirst({
        where: {
            txHash:  txHash
        }
    })
    return true
}

export { initLucid, submitJob, SubmitReqBody }
