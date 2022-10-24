import { RabbitMQClient } from './modules/rabbitmq.client';

async function main(): Promise<void> {
  const rabbitMQClient: RabbitMQClient = new RabbitMQClient(null);

  await rabbitMQClient.connect();

  setInterval(async () => {
    await rabbitMQClient.send(`Producer to Consumer : ${new Date().toISOString()}`);
  }, 2000);
}


main();
