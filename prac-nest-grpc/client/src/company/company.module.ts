import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyGrpcService } from './company.grpc.service';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyGrpcService],
})
export class CompanyModule {}
