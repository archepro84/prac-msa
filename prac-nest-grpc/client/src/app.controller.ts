import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {  HeroesService } from '../../proto/build/hero';
import { grpcClientOptionsByHero } from "./lib/grpc/grpc-client.options";


@Controller()
export class AppController implements OnModuleInit {

  @Client(grpcClientOptionsByHero)
  private readonly clientHero: ClientGrpc;
  private heroService: HeroesService;

  onModuleInit(): any {
    this.heroService = this.clientHero.getService<HeroesService>('HeroesService');
  }

  @Get('hero/:id')
  getHero(@Param('id') id: string) {
    return this.heroService.FindOne({ id: +id });
  }
}
