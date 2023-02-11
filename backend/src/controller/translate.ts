import { doTranslate } from '../service/translateService';

export async function translate(keyword: string) {
  return await doTranslate(keyword, 'auto', 'en');
}
