import { Hono } from 'hono';
import { supabase } from "../db/dbclient.ts";


const app = new Hono();

async function getData(){
  const { data, error } = await supabase
    .from('services')
    .select()

    if (error) {
    console.error("Error fetching characters:", error);
       return []
    }
    else {     
      return data;
    }
}

app.get('/services/functions',async  (c) => {
  //console.log('Fetching functions');
  getData();
  return c.json(
   await getData()
  );
});

app.post('/sendcontacts', async (c) => {
  const { name, email, message } = await c.req.json();
  //console.log('Received contact form data:', { name, email, message });
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }]);
  if (error) {
    console.error("Error inserting contact data:", error);
    return c.json({ error: 'Failed to send message' }, 500);
  }

  // Отправка сообщения в Telegram
  try {
    const tgMessage =
      `Нове повідомлення з форми зворотного зв'язку!\n` +
      `Ім'я: ${name || '-'}\nEmail: ${email || '-'}\nПовідомлення: ${message || '-'}`;
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('CHAT_ID');
    if (telegramToken && chatId) {
      const url =
        `https://api.telegram.org/bot${telegramToken}/sendMessage` +
        `?chat_id=${encodeURIComponent(chatId)}` +
        `&parse_mode=HTML`+
         `&text=${encodeURIComponent(tgMessage)}`;
      console.log('Sending message to Telegram:', url);
      await fetch(url);
    } else {
      console.warn('TELEGRAM_BOT_TOKEN or CHAT_ID is not set in environment');
    }
  } catch (err) {
    console.error('Ошибка отправки в Telegram:', err);
  }

  return c.json({ message: 'Message sent successfully', data }, 200);
});


export default app;
