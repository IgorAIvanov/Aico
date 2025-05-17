import { Hono } from 'hono';
import { serveStatic } from 'hono/deno'


const app = new Hono()


app.use('*', serveStatic({ root: './static' }))
// app.use('/static/*', serveStatic({ root: './' }))
// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

//app.get('*', serveStatic({ path: './static/fallback.txt' }))

app.get('/', (c) => {
  //console.log(c.req.url); 
  
  return c.html(
     <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="stylesheet"  href="https://cdn.simplecss.org/simple.min.css" />
        <script type="module" src="/scripts/app.js"></script>  
      </head>
      <body>
        <h1>Hello AICO!</h1>
        <div id="root" />
      </body>
      </html>
  )
})

Deno.serve(app.fetch)
