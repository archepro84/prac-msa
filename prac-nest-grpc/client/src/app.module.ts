import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGrpcService } from './app.grpc.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppGrpcService],
})
export class AppModule {}
