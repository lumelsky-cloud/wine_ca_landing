import { test } from 'node:test'
import assert from 'node:assert/strict'
import Fastify from 'fastify'
import app from '../../app.js'

test('home page renders', async () => {
  const server = Fastify()
  await server.register(app)
  const response = await server.inject('/')
  assert.equal(response.statusCode, 200)
  assert.match(response.body, /MOMENTS/i)
  assert.match(response.body, /t396__artboard/)
  assert.match(response.body, /\/legacy-assets\/DSC09029_3\.jpg\.webp/)
  assert.match(response.body, /hydrateLocalImages/)
  assert.match(response.body, /tild3630-3636-4066-b761-663061373439\/13_\.jpg/)
  assert.match(response.body, /tild6532-3434-4030-b930-636533313739\/STP_6025\.jpg/)
  assert.match(response.body, /href="\/#rec1225554436"/)
  assert.match(response.body, /href="\/#rec1225577271"/)
})

test('events page fills the original cards with local photos', async () => {
  const server = Fastify()
  await server.register(app)
  const response = await server.inject('/events')
  assert.equal(response.statusCode, 200)
  assert.match(response.body, /moments-event-card-fixes/)
  assert.match(response.body, /fillEventCards/)
  assert.match(response.body, /#rec1557694281/)
  assert.match(response.body, /#rec1557715611/)
  assert.match(response.body, /\/images\/mom\//)
  assert.match(response.body, /Музыкальная вечеринка/)
  assert.match(response.body, /href="\/music-party"/)
  assert.match(response.body, /\/images\/music-party-card\.png/)
  assert.match(response.body, /\/images\/child-party-hero\.png/)
  assert.match(response.body, /href="\/child-party"/)
  assert.match(response.body, /href="\/wine-casino"/)
  assert.match(response.body, /Детский праздник/)
})

test('music party landing is available locally with transferred assets', async () => {
  const server = Fastify()
  await server.register(app)
  const response = await server.inject('/music-party')
  assert.equal(response.statusCode, 200)
  assert.match(response.body, /Music Party/)
  assert.match(response.body, /\/images\/music-party\//)
  assert.match(response.body, /Что такое/)
})

test('child party and wine casino pages render their requested content', async () => {
  const server = Fastify()
  await server.register(app)
  const child = await server.inject('/child-party')
  assert.equal(child.statusCode, 200)
  assert.match(child.body, /Детский праздник/)
  assert.match(child.body, /kids-hero/)
  assert.match(child.body, /\/images\/child-party-hero\.png/)
  assert.match(child.body, /Четыре главы/)
  assert.match(child.body, /class="event-back-link" href="\/events"/)
  assert.doesNotMatch(child.body, /Расскажите нам о вашей идее/)

  const wine = await server.inject('/wine-casino')
  assert.equal(wine.statusCode, 200)
  assert.match(wine.body, /Винное казино/)
  assert.match(wine.body, /\/images\/wine-casino-hero\.png/)
  assert.match(wine.body, /wine-hero/)
  assert.match(wine.body, /Четыре раунда/)
  assert.match(wine.body, /class="event-back-link" href="\/events"/)
  assert.doesNotMatch(wine.body, /detail-gallery__grid/)
})

test('request validates required fields', async () => {
  const server = Fastify()
  await server.register(app)
  const response = await server.inject({ method: 'POST', url: '/request', payload: {} })
  assert.equal(response.statusCode, 400)
})

test('all reconstructed Tilda pages render local Mom assets', async () => {
  const server = Fastify()
  await server.register(app)
  for (const url of ['/', '/gifts', '/events', '/partners', '/members']) {
    const response = await server.inject(url)
    assert.equal(response.statusCode, 200)
    assert.match(response.body, /\/legacy-assets\//)
  }
})
