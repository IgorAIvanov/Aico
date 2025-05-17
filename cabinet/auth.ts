import { Hono } from 'hono';
import { OAuth2Client } from 'https://deno.land/x/oauth2_client/mod.ts';

const app = new Hono();

// Настройка OAuth2 клиента
const oauth2Client = new OAuth2Client({
  clientId: 'YOUR_GOOGLE_CLIENT_ID', // Замените на ваш Client ID
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET', // Замените на ваш Client Secret
  authorizationEndpointUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  redirectUri: 'http://localhost:8000/auth/callback', // Замените на ваш Redirect URI
  defaults: {
    scope: 'openid email profile',
  },
});

// Маршрут для начала авторизации
app.get('/auth/google', (c) => {
  const authorizationUri = oauth2Client.code.getAuthorizationUri();
  return c.redirect(authorizationUri.toString());
});

// Маршрут для обработки обратного вызова
app.get('/auth/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) {
    return c.text('Authorization code not found', 400);
  }

  try {
    const token = await oauth2Client.code.getToken(code);
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    }).then((res) => res.json());

    return c.json(userInfo);
  } catch (error) {
    return c.text('Error during authentication: ' + error.message, 500);
  }
});

Deno.serve(app.fetch);