import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CompanyById,
  CompanyService,
  CreateCompany,
} from '../../../proto/company/build/company';
import { CompanyGrpcClient } from './grpc/company.grpc.client';
import { Client, ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class CompanyGrpcService implements OnModuleInit {
  @Client(CompanyGrpcClient)
  private readonly clientCompany: ClientGrpc;
  private companyService: CompanyService;

  onModuleInit(): any {
    this.companyService =
      this.clientCompany.getService<CompanyService>('CompanyService');
  }

  async getCompany(companyById: CompanyById) {
    return this.companyService.FindOne(companyById);
  }

  async createCompany(company: CreateCompany) {
    const result = await this.companyService.Create(company);
    return result;
  }
}
