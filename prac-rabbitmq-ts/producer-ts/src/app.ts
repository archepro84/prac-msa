import { RabbitMQProducerClient } from './modules/rabbitmq-producer.client';

async function main(): Promise<void> {
  const rabbitMQClient: RabbitMQProducerClient = new RabbitMQProducerClient();

  await rabbitMQClient.connect();

  setInterval(async () => {
    await rabbitMQClient.send(
      `Producer to Consumer : ${new Date().toISOString()}`
    );
  }, 2000);
}

main();
