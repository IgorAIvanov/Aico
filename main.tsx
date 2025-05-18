import { Hono } from 'hono';
import { serveStatic } from 'hono/deno';
import auth from './route/auth.tsx';
import cabinet  from './route/cabinet.tsx';

console.log(Deno.env.get('APP_MODE'))
const app = new Hono()


app.use('*', serveStatic({ root: './static' }));


app.get('/', (c) => {
  return c.html(Deno.readTextFileSync('./static/landing.html'))
});

app.route('/auth', auth)
app.route('/cabinet', cabinet)


Deno.serve(app.fetch)
