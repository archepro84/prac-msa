import * as client from 'amqplib';
import { Channel, Connection } from 'amqplib';
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

  const queueName = 'arch-queue';

  // Rabbit MQ의 Channel을 생성합니다.
  const channel: Channel = await connection.createChannel();

  // Client가 Queue를 사용할 수 있도록 생성합니다.
  await channel.assertQueue(queueName);

  // queueName에 해당하는 Queue에 메시지를 전송합니다.
  // 메시지는 한방향으로만 움직이기 때문에 Await을 사용하지 않습니다.
  channel.sendToQueue(queueName, Buffer.from('Send Message Event'));
}


main();
