import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono 2!')
})

Deno.serve(app.fetch)
