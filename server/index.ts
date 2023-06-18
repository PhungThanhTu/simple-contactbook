import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongooseConnection from './src/mongo/connection';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongooseConnection.init();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express2 + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Contactbook is running at http://localhost:${port}`);
});