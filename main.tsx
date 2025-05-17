import { Hono } from 'hono';
import { serveStatic } from 'hono/deno';
import { html } from 'hono/html';


const app = new Hono()


app.use('*', serveStatic({ root: './static' }));
// app.use('/static/*', serveStatic({ root: './' }))
// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

//app.get('*', serveStatic({ path: './static/fallback.txt' }))

app.get('/', (c) => {
  return c.html(Deno.readTextFileSync('./static/landing.html'))
});
app.get('/auth', (c) => {
  //console.log(c.req.url); 
  
  return c.html(html`<!doctype html>
     <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="stylesheet"  href="https://cdn.simplecss.org/simple.min.css" />
        <script type="module" src="/scripts/cabinet/login.js"></script>  
        <title>Aico AI provider</title>

      </head>
      <body>
        
        <div id="root"></div>
      </body>
      </html>
  `)
})

Deno.serve(app.fetch)
