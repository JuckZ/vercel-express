import { doGenImage } from '../service/genImageService';
import { translate } from '../controller/translate';

export async function genImage(origin: string, keyword: string) {
  const newKeyword = await translate(keyword);
  return await doGenImage(origin, newKeyword);
}
