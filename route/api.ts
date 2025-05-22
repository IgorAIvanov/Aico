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



export default app;
