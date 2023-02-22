import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HeroGrpcService } from './hero.grpc.service';
import { CreateHero } from '../../../proto/hero/build/hero';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroGrpcService: HeroGrpcService) {}

  @Get(':id')
  getHero(@Param('id') id: string) {
    return this.heroGrpcService.getHero({ id: +id });
  }

  @Post('')
  async createHero(@Body() hero: CreateHero) {
    const result = await this.heroGrpcService.createHero(hero);
    return result;
  }
}
