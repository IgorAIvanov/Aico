import { Hono } from 'hono';
import { serveStatic } from 'hono/deno';
import auth from './route/auth.tsx';
import cabinet  from './route/cabinet.tsx';
import api from './route/api.ts';
import mcp from './services/mcp/route_mcp.ts';


console.log(Deno.env.get('APP_MODE'));

const app = new Hono()

app.use('*', serveStatic({ root: './static' }));
//app.use('/shoelace/*', serveStatic({ root: './node_modules/@shoelace-style' }));

app.get('/', (c) => {
  return c.html(Deno.readTextFileSync('./static/landing.html'))
});


app.route('/auth', auth);
app.route('/cabinet', cabinet);
app.route('/api', api);
app.route('/mcp', mcp);

Deno.serve(app.fetch)
