import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Leathers!')
})

Deno.serve(app.fetch)
