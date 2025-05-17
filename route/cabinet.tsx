import { Hono } from 'hono';
import { html } from 'hono/html';


const app = new Hono()

app.get('/', (c) => {
  return c.html(html`<!doctype html>
     <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="stylesheet"  href="https://cdn.simplecss.org/simple.min.css" />
        <script type="module" src="/scripts/cabinet/layout.js"></script>  
        <title>Aico AI provider</title>
      </head>
      <body>        
        <div id="root"></div>
      </body>
      </html>
  `)
})

export default app;