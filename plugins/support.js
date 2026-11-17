import fp from 'fastify-plugin'
import view from '@fastify/view'
import pug from 'pug'

export default fp(async function (fastify) {
  fastify.register(view, { engine: { pug }, root: 'views' })
})
