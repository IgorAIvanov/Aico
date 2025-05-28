import { supabase } from "../db/dbclient.ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function run() {
  

  // Получаем все статьи
  const { data: articles, error } = await supabase
    .from('a2v10_help')
    .select('id, content');
  if (error) {
    console.error('Ошибка получения статей:', error);
    return;
  }
  if (!articles) {
    console.log('Нет статей для обработки.');
    return;
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  for (const article of articles) {
    const { id: part_id, content } = article;
    if (!content) continue;
    // Разбиваем на чанки с помощью langchain
    const chunks = await splitter.splitText(content);
    for (const chunk of chunks) {
      if (chunk.trim().length === 0) continue;
      const { error: insertError } = await supabase
        .from('a2v10_chank')
        .insert([{ content: chunk, part_id }]);
      if (insertError) {
        console.error('Ошибка записи чанка:', insertError);
      }
    }
    console.log(`Статья id=${part_id} разбита и записана.`);
  }
  console.log('Готово!');
}


export default run;
