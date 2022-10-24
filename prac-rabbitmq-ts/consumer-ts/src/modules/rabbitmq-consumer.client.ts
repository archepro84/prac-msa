import { Channel, Connection, ConsumeMessage } from 'amqplib';
import * as client from 'amqplib';
import { rabbitMqConfigs } from '../configs/rabbitmq.configs';

export class RabbitMQConsumerClient {
  queueName: string;
  connection: Connection;
  channel: Channel;

  constructor(queueName?: string) {
    if (!queueName) queueName = 'arch-queue';
    this.queueName = queueName;
  }

  // RabbitMQ와 연결합니다.
  connect = async (): Promise<void> => {
    this.connection = await client.connect(
      rabbitMqConfigs.url
        ? rabbitMqConfigs.url
        : `amqps://${rabbitMqConfigs.user}:${rabbitMqConfigs.password}@${rabbitMqConfigs.host}/${rabbitMqConfigs.user}`
    );

    // Rabbit MQ의 Channel을 생성합니다.
    this.channel = await this.connection.createChannel();

    // Client가 Queue를 사용할 수 있도록 생성합니다.
    await this.channel.assertQueue(this.queueName);
  };

  consume = async (
    onMessageConsumeEvent: (msg: ConsumeMessage | null) => void
  ): Promise<void> => {
    // queueName에 해당하는 Queue의 데이터를 수신합니다.
    //  데이터를 수신할 때, onMessageConsumeEvent에 해당하는 CallBack 이벤트가 실행됩니다.
    await this.channel.consume(this.queueName, onMessageConsumeEvent);
  };
}
