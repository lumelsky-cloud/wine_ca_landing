import path from 'node:path'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const options = { routerOptions: { ignoreTrailingSlash: true } }

export default async function app(fastify, opts) {
  fastify.register(AutoLoad, { dir: path.join(__dirname, 'plugins'), options: opts })
  fastify.register(AutoLoad, { dir: path.join(__dirname, 'routes'), options: opts })
}
