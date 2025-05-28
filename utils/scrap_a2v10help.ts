import puppeteer from 'puppeteer';

import { supabase } from "../db/dbclient.ts"; // Adjust the import path as needed
import chank from "./chank_a2.ts";
import index from "./index_a2.ts";

async function run() {

  
  const linksForLoad: string[] = [];
  const loadedLinks: string[] = [];
  const startTime = Date.now();
  
	const browser = await puppeteer.launch(); 
  const baseUrl = 'https://docs-en.a2v10.com'
  const resultFile = 'a2_help.txt';
	// Create a new page with the default browser context 
  const page = await browser.newPage();
  let newLinks:string[] = [];
  linksForLoad.push(baseUrl+'/index');
  
 
  while (true) {
    if (linksForLoad.length === 0) {
      break;
    }
    const link = linksForLoad.shift();
    if (link) {
      console.log('going to link: ' + link);
      await page.goto(link, { waitUntil: ['domcontentloaded', 'networkidle0'] }); 
      newLinks = await getLinks();
      await scrabLink();
      loadedLinks.push(link);
    }
    if (newLinks.length === 0) {
      continue;
    }
    
    for (const link of newLinks) { 
      if (!(loadedLinks.includes(link) || linksForLoad.includes(link))) {
        if (link.endsWith('.', link.length - 3)){
          continue;
        }
        if (link.startsWith(baseUrl)){
                  linksForLoad.push(link);
        }
      }
    }

  };
  
 //for (const nlink of loadedLinks) {
  //const nlink = linksForLoad[10];
  //  await scrabLink(nlink);
  //};


   await browser.close(); 
   console.log('Site was scraped successfully!');
   console.log('Time spent: ' + (Date.now() - startTime) + ' ms');

   async function getLinks() {    
    const links = await page.$$eval('a', nodes => nodes.map(n => n.href));
    console.log('links loaded');
    return links;
  }

  async function scrabLink() {
      console.log('begin scrabing page');
      let title = '';
      try {
        title = await page.$eval('h1', node => (node as HTMLElement).innerText);
      } catch (_e) {
        title = '[NO H1]';
      }
      await Deno.writeTextFile(resultFile, '\n\n*** \n Part: ' + title + ' \n ', { append: true });
      // Получаем все нужные элементы начиная с <div class="help-content-view">
      const elements = await page.evaluate(() => {
        function tableToText(tableNode: HTMLTableElement): string {
          return Array.from(tableNode.rows).map((row: HTMLTableRowElement) =>
            Array.from(row.cells).map((cell: HTMLTableCellElement) =>
              ' ' + cell.innerText.trim() + ' '
            ).join(' | ')
          ).join('\n');
        }
        const result: {type: string, text: string}[] = [];
        let stop = false;
        function walk(node: Node, parentTag?: string) {
          if (stop || !node) return;
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName ? el.tagName.toLowerCase() : '';
            if (tag === 'footer') {
              stop = true;
              return;
            }
            if (tag === 'span') {
              const spanText = Array.from(el.childNodes)
                .filter(n => n.nodeType === Node.TEXT_NODE)
                .map(n => n.textContent?.trim() || '')
                .join(' ');
              if (spanText.length > 0) {
                result.push({ type: 'span', text: spanText });
              }
              return;
            } else if (tag === 'code') {
              if (parentTag !== 'code' && parentTag !== 'span') {
                const codeText = Array.from(el.childNodes)
                  .filter(n => n.nodeType === Node.TEXT_NODE)
                  .map(n => n.textContent || '')
                  .join('');
                if (codeText && codeText.trim().length > 0) {
                  result.push({ type: 'code', text: codeText.trim() });
                }
                return;
              }
            } else if (tag === 'p') {
              if (parentTag !== 'code' && parentTag !== 'span') {
                const pText = Array.from(el.childNodes)
                  .filter(n => n.nodeType === Node.TEXT_NODE)
                  .map(n => n.textContent || '')
                  .join('');
                if (pText && pText.trim().length > 0) {
                  result.push({ type: 'p', text: pText.trim() });
                }
              }
            } else if (tag === 'table') {
              result.push({ type: 'table', text: tableToText(el as HTMLTableElement) });
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            if (text && text.length > 0 && parentTag !== 'span' && parentTag !== 'code') {
              result.push({ type: 'text', text });
            }
          }
          if (node.childNodes && node.childNodes.length > 0) {
            const el = node as HTMLElement;
            const tag = el.tagName ? el.tagName.toLowerCase() : parentTag;
            for (let i = 0; i < node.childNodes.length; i++) {
              if (stop) return;
              walk(node.childNodes[i], tag);
            }
          }
        }
        // Новый старт: ищем <div class="help-content-view">
        const startDiv = document.querySelector('div.help-content-view');
        if (startDiv) {
          walk(startDiv);
        }
        return result;
      });
      const elementsArr = elements as Array<{type: string, text: string}>;
      let content = '';
      for (const el of elementsArr) {
        if (el.type === 'p') {
          await Deno.writeTextFile(resultFile, el.text + ' \n', { append: true });
          content += el.text + ' \n';
        } else if (el.type === 'code') {
          await Deno.writeTextFile(resultFile, el.text.replace(/\n/g, ' ').trim() + ' ', { append: true });
          content += el.text.replace(/\n/g, ' ').trim() + ' ';
        } else if (el.type === 'span') {
          await Deno.writeTextFile(resultFile, el.text + ' ', { append: true });
          content += el.text + ' ';
        } else if (el.type === 'table') {
          await Deno.writeTextFile(resultFile, '\n[Table]\n' + el.text + '\n', { append: true });
          content += '\n[Table]\n' + el.text + '\n';
        } else if (el.type === 'text') {
          await Deno.writeTextFile(resultFile, ' ' + el.text + ' ', { append: true });
          content += ' ' + el.text + ' ';
        }
      }
      // --- Сохраняем в базу ---
      const { error } = await supabase
        .from('a2v10_help')
        .insert([{ name: title, content }]);
      if (error) {
        console.error('Ошибка записи в базу:', error);
      } else {
        console.log('Данные успешно записаны в базу:', title);
      }
      // --- конец блока записи в базу ---
      console.log('page scrabed');
    }  

    
}
//await run();
//await chank(); // Запускаем обработку чанков после завершения скрапа
await index(); // Запускаем индексацию после обработки чанков

export default run;