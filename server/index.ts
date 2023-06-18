import express, { Express, Request, Response, json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongooseConnection from './src/mongo/connection';
import handleError from './src/middlewares/errorHandler.middleware';
import contactRouter from './src/routes/contact'


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongooseConnection.init();

app.use(cors());
app.use(express.json());

app.use('/contact', contactRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express2 + TypeScript Server');
});

app.use(handleError)

app.listen(port, () => {
  console.log(`[server]: Contactbook is running at http://localhost:${port}`);
});