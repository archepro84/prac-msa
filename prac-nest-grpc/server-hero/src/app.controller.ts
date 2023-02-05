import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from "@nestjs/microservices";
import { HeroById, HeroesService } from '../../proto/build/hero';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById) {
    return this.appService.findOne(data);
  }

  @GrpcMethod('HeroesService', 'FindAll')
  findAll() {
    return this.appService.findAll();
  }
}
