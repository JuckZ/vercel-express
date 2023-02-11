import crypto from 'crypto';
import axios from 'axios';

import { BaiduTranslate } from '../config/BaiduTranslate';

const salt = 'random';
const baiduTranslateConfig = new BaiduTranslate(
  process.env.BAIDU_TRANSLATE_APPID,
  process.env.BAIDU_TRANSLATE_APPSECRET
);

function encrypt(str: string) {
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
}

export async function doTranslate(keyword: string, from: string, to: string) {
  console.error(baiduTranslateConfig.getAppId());
  const sign = encrypt(baiduTranslateConfig.getAppId() + keyword + salt + baiduTranslateConfig.getAppSecret());
  const url =
    'https://fanyi-api.baidu.com/api/trans/vip/translate?q=' +
    encodeURI(keyword) +
    '&from=zh&to=en&appid=' +
    baiduTranslateConfig.getAppId() +
    '&salt=' +
    salt +
    '&sign=' +
    sign;
  const res = await axios.get(url);
  if (res.status == 200) {
    return res.data.trans_result[0].dst;
  } else {
    return '';
  }
}
