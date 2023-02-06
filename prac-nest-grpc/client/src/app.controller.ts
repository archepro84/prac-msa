import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { CreateHero, HeroesService } from '../../proto/build/hero';
import { CompanyService, CreateCompany } from '../../proto/build/company';
import {
  grpcClientOptionsByCompany,
  grpcClientOptionsByHero,
} from './lib/grpc/grpc-client.options';

@Controller()
export class AppController implements OnModuleInit {
  @Client(grpcClientOptionsByHero)
  private readonly clientHero: ClientGrpc;
  private heroService: HeroesService;

  @Client(grpcClientOptionsByCompany)
  private readonly clientCompany: ClientGrpc;
  private companyService: CompanyService;

  onModuleInit(): any {
    this.heroService =
      this.clientHero.getService<HeroesService>('HeroesService');
    this.companyService =
      this.clientCompany.getService<CompanyService>('CompanyService');
  }

  @Get('hero/:id')
  getHero(@Param('id') id: string) {
    return this.heroService.FindOne({ id: +id });
  }

  @Post('hero')
  async createHero(@Body() hero: CreateHero) {
    const result = await this.heroService.Create(hero);
    return result;
  }

  @Get('company/:id')
  async getCompany(@Param('id') id: string) {
    return this.companyService.FindOne({ id: +id });
  }

  @Post('company')
  async createCompany(@Body() company: CreateCompany) {
    const result = await this.companyService.Create(company);
    return result;
  }
}
