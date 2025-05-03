import { Hono } from 'hono';
import { serveStatic } from 'hono/deno'


const app = new Hono()

app.get('/', (c) => {
  //console.log(c.req.url);
  if (c.req.url.includes('www')){
     {c.redirect('https://aicoai.com.ua')}
     return;
  }
  return c.html(Deno.readTextFileSync('./static/landing.html'))
})

Deno.serve(app.fetch)
