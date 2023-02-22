import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroGrpcService } from './hero.grpc.service';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [HeroGrpcService],
})
export class HeroModule {}
