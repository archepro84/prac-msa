import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateHero } from '../../proto/hero/build/hero';
import { CreateCompany } from '../../proto/company/build/company';
import { AppGrpcService } from './app.grpc.service';

@Controller()
export class AppController {
  constructor(private readonly appGrpcService: AppGrpcService) {}

  @Get('hero/:id')
  getHero(@Param('id') id: string) {
    return this.appGrpcService.getHero({ id: +id });
  }

  @Post('hero')
  async createHero(@Body() hero: CreateHero) {
    const result = await this.appGrpcService.createHero(hero);
    return result;
  }

  @Get('company/:id')
  async getCompany(@Param('id') id: string) {
    return this.appGrpcService.getCompany({ id: +id });
  }

  @Post('company')
  async createCompany(@Body() company: CreateCompany) {
    const result = await this.appGrpcService.createCompany(company);
    return result;
  }
}
