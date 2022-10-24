import * as dotenv from 'dotenv';
import * as path from 'path';

const filePath = process.env.NODE_ENV === 'prod' ? '.prod.env' : '.dev.env';
dotenv.config({ path: path.resolve(`${__dirname}../../../../${filePath}`) });

export const rabbitMqConfigs = {
  host: process.env.RABBIT_MQ_HOST,
  user: process.env.RABBIT_MQ_USER,
  password: process.env.RABBIT_MQ_PASSWORD,
  port: process.env.RABBIT_MQ_PORT,
  url: process.env.RABBIT_MQ_URL,
};
