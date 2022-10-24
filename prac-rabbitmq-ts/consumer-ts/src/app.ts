import * as client from 'amqplib';
import { Channel, Connection, ConsumeMessage } from 'amqplib';
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


  // queueName에 해당하는 Queue의 데이터를 수신합니다.
  //  데이터를 수신할 때, onMessageConsumeEvent에 해당하는 CallBack 이벤트가 실행됩니다.
  await channel.consume(queueName, onMessageConsumeEvent);

}

function onMessageConsumeEvent(_message: ConsumeMessage | null) {
  if (_message) {
    return console.log(_message.content.toString());
  }
}


main();
