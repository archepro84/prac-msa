import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { HeroGrpcClient } from './grpc/hero.grpc.client';
import {
  CreateHero,
  HeroById,
  HeroesService,
} from '../../../proto/hero/build/hero';

@Injectable()
export class HeroGrpcService implements OnModuleInit {
  @Client(HeroGrpcClient)
  private readonly clientHero: ClientGrpc;
  private heroService: HeroesService;

  onModuleInit(): any {
    this.heroService =
      this.clientHero.getService<HeroesService>('HeroesService');
  }

  async getHero(heroById: HeroById) {
    return this.heroService.FindOne(heroById);
  }

  async createHero(createHero: CreateHero) {
    const result = await this.heroService.Create(createHero);
    return result;
  }
}
