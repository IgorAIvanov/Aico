
import { createClient } from "supabase";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");



export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

export async function getSupabaseClient() {
    const { data, error } = await supabaseClient
    .from('Test_User')
    .select()

    if (error) {
    console.error("Error fetching characters:", error);
    }
    else {
    console.log("Characters:", data);
    }
}
        