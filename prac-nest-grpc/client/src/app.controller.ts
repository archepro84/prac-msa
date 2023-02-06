import { Body, Controller, Get, OnModuleInit, Param, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { CreateHero, HeroesService } from '../../proto/build/hero';
import { grpcClientOptionsByHero } from './lib/grpc/grpc-client.options';

@Controller()
export class AppController implements OnModuleInit {
  @Client(grpcClientOptionsByHero)
  private readonly clientHero: ClientGrpc;
  private heroService: HeroesService;

  onModuleInit(): any {
    this.heroService =
      this.clientHero.getService<HeroesService>('HeroesService');
  }

  @Get('hero/:id')
  getHero(@Param('id') id: string) {
    return this.heroService.FindOne({ id: +id });
  }

  @Post("hero")
  async createHero(@Body() hero: CreateHero) {
    const result = await this.heroService.Create(hero);
    return result;
  }
}
