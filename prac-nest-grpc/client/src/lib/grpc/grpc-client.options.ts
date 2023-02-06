import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptionsByHero: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50090',
    package: 'hero',
    protoPath: '../proto/hero.proto',
  },
};

export const grpcClientOptionsByCompany: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50091',
    package: 'company',
    protoPath: '../proto/company.proto',
  },
};
