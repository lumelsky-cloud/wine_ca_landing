import Fastify from 'fastify'
import app from './app.js'

const server = Fastify({ logger: true })
await server.register(app)
await server.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' })
