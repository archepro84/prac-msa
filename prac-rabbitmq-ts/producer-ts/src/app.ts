import * as client from 'amqplib';
import { Connection } from 'amqplib';
import * as dotenv from 'dotenv';
import * as path from 'path';

const filePath = process.env.NODE_ENV === 'prod' ? '.prod.env' : '.dev.env';
dotenv.config({ path: path.resolve(`${__dirname}../../../${filePath}`) });

const rabbitMqConfigs = {
  host: process.env.RABBIT_MQ_HOST,
  user: process.env.RABBIT_MQ_USER,
  password: process.env.RABBIT_MQ_PASSWORD,
  port: process.env.RABBIT_MQ_PORT,
  url: process.env.RABBIT_MQ_URL,
};

async function main(): Promise<void> {
  const connection: Connection = await client.connect(
    rabbitMqConfigs.url ? rabbitMqConfigs.url :
      `amqps://${rabbitMqConfigs.user}:${rabbitMqConfigs.password}@${rabbitMqConfigs.host}/${rabbitMqConfigs.user}`,
  );

}


main();
