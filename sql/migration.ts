
import {supabase} from '../db/dbclient.ts';

export async function getSupabaseClient() {
    const { data, error } = await supabase
    .from('employees')
    .select()

    if (error) {
    console.error("Error fetching characters:", error);
    }
    else {
        data.forEach((item) => {
            console.log("id:", item.id);
        });
    console.log("Data in table:", data);
    }
}
        