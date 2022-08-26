import { PrismaClient } from '@prisma/client';
import fastify from 'fastify'
import Bottleneck from 'bottleneck'
import { submitJob } from './cardano-utils.js'
import { harvestTx } from './harvestTx.js'
import { pendingRewards } from './pendingRewards.js'
import dotenv from 'dotenv'
dotenv.config()

//IMPORTANT FOR NFT MINT OR FT CLAIMS:
//IF PARALLEL REQUESTS ARE COMING IN, VALIDATE ONE BY ONE (no double-mints or double-claims)
const limiter = new Bottleneck({
    maxConcurrent: 1
})

const PORT = process.env.PORT

if (!PORT) {
  throw 'Environment variables not set'
}

const server = fastify()
const prisma = new PrismaClient();

server.register(import('@fastify/cors'),
    (instance) =>
        (req: any, callback: any) => {
            const corsOptions = {
                // This is NOT recommended for production as it enables reflection exploits
                origin: true
            };

            // do not include CORS headers for requests from localhost
            if (/^localhost$/m.test(req.headers.origin)) {
                corsOptions.origin = false
            }

            // callback expects two parameters: error and options
            callback(null, corsOptions)
        }
)

server.listen(PORT, '0.0.0.0')

server.get('/bing', async (request, reply) => {
    console.log('poo poo')
    return "poo poo"
})

server.post('/harvestTx', async (request, reply) => {
    console.log(`Entered /harvestTx`)
    const body: any = request.body
    const resp = await limiter.schedule(() => harvestTx(prisma, body))
    console.log(resp)
    return resp
})

server.post('/submit', async (request, reply) => {
    console.log(`Entered /submit`)
    const body: any = request.body
    return await limiter.schedule(() => submitJob(prisma, body))
})

server.post('/pendingRewards', async (request, reply) => {
    const body: any = request.body
    return await limiter.schedule(() => pendingRewards(prisma, body))
})