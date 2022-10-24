import { Channel, Connection } from 'amqplib';
import * as client from 'amqplib';
import { rabbitMqConfigs } from '../configs/rabbitmq.configs';

export class RabbitMQClient {
  queueName: string;
  connection: Connection;
  channel: Channel;

  constructor(queueName: string | undefined) {
    if (!queueName) queueName = 'arch-queue';
    this.queueName = queueName;
  }

  // RabbitMQ와 연결합니다.
  connect = async (): Promise<void> => {
    this.connection = await client.connect(
      rabbitMqConfigs.url ? rabbitMqConfigs.url :
        `amqps://${rabbitMqConfigs.user}:${rabbitMqConfigs.password}@${rabbitMqConfigs.host}/${rabbitMqConfigs.user}`,
    );

    // Rabbit MQ의 Channel을 생성합니다.
    this.channel = await this.connection.createChannel();

    // Client가 Queue를 사용할 수 있도록 생성합니다.
    await this.channel.assertQueue(this.queueName);
  };

  // queueName에 해당하는 Queue에 메시지를 전송합니다.
  // 메시지는 한방향으로만 움직이기 때문에 Await을 사용하지 않습니다.
  send = (sendMessage: string): void => {
    this.channel.sendToQueue(
      this.queueName,
      Buffer.from(sendMessage),
    );
  };
}

