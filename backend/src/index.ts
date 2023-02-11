import express from 'express';
import { Request, Response } from 'express';
import { hello } from './config/env';
import { translate } from './controller/translate';
import { genImage } from './controller/genImage';
import { recordRoutes } from './controller/record';
// import cors from "cors"; // for CORS setup, usage: app.use(cors());

console.log(hello);
export const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.get('/api', (req: Request, res: Response) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `/api/item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:itemId', (req: Request, res: Response) => {
  const { key } = req.params;
  res.json({ key });
});

app.get('/test/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id });
});

app.get('/baidu_translate/vip/translate', async (req: Request, res: Response) => {
  const result = await translate(req.query.keyword as string);
  res.json({ data: result });
});

app.get('/gen_image/from_keyword', async (req: Request, res: Response) => {
  const result = await genImage(req.query.origin as string, req.query.keyword as string);
  res.json({ data: result });
});

app.use(recordRoutes);
// Global error handling
// app.use((err, _req, res) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;

// ($env:ENV="local") -and (npm run dev)
