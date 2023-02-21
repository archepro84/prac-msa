import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  CreateHero,
  HeroById,
  HeroesService,
} from '../../proto/hero/build/hero';
import {
  CompanyById,
  CompanyService,
  CreateCompany,
} from '../../proto/company/build/company';
import {
  grpcClientOptionsByCompany,
  grpcClientOptionsByHero,
} from './lib/grpc/grpc-client.options';

@Injectable()
export class AppGrpcService implements OnModuleInit {
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

  getHero(heroById: HeroById) {
    return this.heroService.FindOne(heroById);
  }

  async createHero(createHero: CreateHero) {
    const result = await this.heroService.Create(createHero);
    return result;
  }

  async getCompany(companyById: CompanyById) {
    return this.companyService.FindOne(companyById);
  }

  async createCompany(company: CreateCompany) {
    const result = await this.companyService.Create(company);
    return result;
  }
}
