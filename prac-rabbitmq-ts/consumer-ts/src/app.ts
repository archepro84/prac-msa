import { RabbitMQConsumerClient } from './modules/rabbitmq-consumer.client';
import { ConsumeMessage } from 'amqplib';

async function main(): Promise<void> {
  const rabbitMQConsumerClient: RabbitMQConsumerClient = new RabbitMQConsumerClient();

  await rabbitMQConsumerClient.connect();

  rabbitMQConsumerClient.consume(onMessageConsumeEvent);

}

function onMessageConsumeEvent(_message: ConsumeMessage | null) {
  if (_message) {
    return console.log(_message.content.toString());
  }
}

main();
