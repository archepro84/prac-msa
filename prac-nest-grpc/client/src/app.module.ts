import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGrpcService } from './app.grpc.service';
import { HeroModule } from './hero/hero.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [HeroModule, CompanyModule],
  controllers: [AppController],
  providers: [AppGrpcService],
})
export class AppModule {}
