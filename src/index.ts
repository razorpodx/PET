import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import Logger from './lib/logger';
import morganMiddleware from './config/morgan';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

const port = process.env.PORT || 3636;

app.get('/logger', (req: Request, res: Response) => {
  Logger.error('Error');
  Logger.warn('Warn');
  Logger.info('Info');
  Logger.http('Http');
  Logger.debug('Debug');
  Logger.verbose('Verbose');
  Logger.silly('Silly');
  res.send('Hello World!');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
