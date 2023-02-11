// config/env.js
import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';

// 先构造出.env*文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);
const pathsDotenv = resolveApp('.env');
config();
// 按优先级由高到低的顺序加载.env文件
config({ path: `${pathsDotenv}.local` }); // 加载.env.local
config({ path: `${pathsDotenv}.development` }); // 加载.env.development
config({ path: `${pathsDotenv}` }); // 加载.env

export const hello = 'world';
