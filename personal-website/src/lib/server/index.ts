import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'
import cors from '@fastify/cors'

const prisma = new PrismaClient()
const fastify = Fastify({ logger: true })

// Register CORS
await fastify.register(cors, {
  origin: true // Configure according to your needs
})

// Example routes
fastify.get('/api/posts', async (request, reply) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true
      }
    })
    return posts
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch posts' })
  }
})

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()