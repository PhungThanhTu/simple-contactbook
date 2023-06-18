import dotenv from 'dotenv';
import { DBConnection } from '../types';

dotenv.config();

const mongoConfig: DBConnection = {
    conString: process.env.MONGO_CONSTRING
}

export default mongoConfig;