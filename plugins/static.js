import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default fp(async function (fastify) {
  fastify.register(fastifyStatic, { root: path.join(__dirname, '..', 'public'), prefix: '/' })
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'Mom'),
    prefix: '/legacy-assets/',
    decorateReply: false
  })
})
