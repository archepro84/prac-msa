import { ClientOptions, Transport } from '@nestjs/microservices';

export const CompanyGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50091',
    package: 'company',
    protoPath: '../proto/company/company.proto',
  },
};
