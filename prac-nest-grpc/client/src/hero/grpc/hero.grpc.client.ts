import { ClientOptions, Transport } from '@nestjs/microservices';

export const HeroGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50090',
    package: 'hero',
    protoPath: '../proto/hero/hero.proto',
  },
};
