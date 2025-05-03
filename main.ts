import { Hono } from 'hono';
import { serveStatic } from 'hono/deno'


const app = new Hono()

app.get('/', (c) => {
  return c.html(Deno.readTextFileSync('./static/landing.html'))
})

Deno.serve(app.fetch)
