import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyGrpcService } from './company.grpc.service';
import { CreateCompany } from '../../../proto/company/build/company';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyGrpcService: CompanyGrpcService) {}

  @Get(':id')
  async getCompany(@Param('id') id: string) {
    return this.companyGrpcService.getCompany({ id: +id });
  }

  @Post('')
  async createCompany(@Body() company: CreateCompany) {
    const result = await this.companyGrpcService.createCompany(company);
    return result;
  }
}
