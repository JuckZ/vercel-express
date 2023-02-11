import axios from 'axios';
import { createClient } from 'pexels';
import { colorSchema } from '../const/constants';

const pexelsClient = createClient(process.env.PEXELS_APIKEY);

export async function doGenImage(origin: string, keyword: string) {
  switch (origin) {
    case 'pixabay':
      const pixabayRes: any = await new Promise((resolve, reject) => {
        axios
          .get(
            `https://pixabay.com/api/?key=${process.env.PIXABAY_APIKEY}&q=${keyword}&image_type=photo&pretty=true&min_width=600&order=popular`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => reject(error));
      });
      if (pixabayRes.status === 200 && pixabayRes?.data?.total) {
        return pixabayRes.data.hits[0].largeImageURL;
      } else {
        return '';
      }
    case 'pexels':
      const pexelsRes: any = await new Promise((resolve, reject) => {
        pexelsClient.photos.search({ query: keyword, size: 'large', per_page: 1 }).then((photos) => {
          resolve(photos);
        });
      });

      if (pexelsRes?.photos.length > 0) {
        return pexelsRes.photos[0].src.medium;
      } else {
        return '';
      }
    case 'dummyimage':
      const color = colorSchema[Math.floor(Math.random() * colorSchema.length)];
      return (
        'https://dummyimage.com/700x400/' +
        color.bg.replace('#', '') +
        '/' +
        color.fg.replace('#', '') +
        '.png&text=' +
        keyword
      );
    default:
      break;
  }
}
