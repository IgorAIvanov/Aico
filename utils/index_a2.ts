import { supabase } from "../db/dbclient.ts";
import OpenAI from "openai";

async function run() {
  const openai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY"),
  });

  // Получаем все чанки без вектора
  const { data: chunks, error } = await supabase
    .from('a2v10_chank')
    .select('id, content')
    .is('vector', null);
  if (error) {
    console.error('Ошибка получения чанков:', error);
    return;
  }
  if (!chunks || chunks.length === 0) {
    console.log('Нет чанков для индексации.');
    return;
  }

  for (const chunk of chunks) {
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk.content,
        dimensions: 512 // Убедитесь, что размерность соответствует модели
      });
      const embedding = embeddingResponse.data[0].embedding;
      // Вектор должен быть сохранён как массив чисел
      const { error: updateError } = await supabase
        .from('a2v10_chank')
        .update({ vector: embedding })
        .eq('id', chunk.id);
      if (updateError) {
        console.error('Ошибка обновления вектора для id', chunk.id, updateError);
      } else {
        console.log('Вектор успешно сохранён для id', chunk.id);
      }
    } catch (e) {
      console.error('Ошибка получения embedding для id', chunk.id, e);
    }
  }
  console.log('Индексация завершена!');
}

export default run;
