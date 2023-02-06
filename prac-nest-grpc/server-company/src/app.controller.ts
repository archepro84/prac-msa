import { Controller } from '@nestjs/common';
import {
  Company,
  CompanyById,
  CompanyService,
  CreateCompany,
} from '../../proto/build/company';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  private companyArray: Company[] = [
    {
      id: 1,
      name: 'fooBar1',
    },
    {
      id: 2,
      name: 'fooBar2',
    },
  ];

  @GrpcMethod('CompanyService', 'FindOne')
  async findOne(data: CompanyById): Promise<Company> {
    return this.companyArray.find(({ id }) => id === data.id);
  }

  @GrpcMethod('CompanyService', 'Create')
  Create(createCompany: CreateCompany) {
    const { name } = createCompany;

    const companyId =
      Math.max(...this.companyArray.map((hero) => hero.id), 0) + 1;
    const company: Company = {
      id: companyId,
      name: name,
    };

    this.companyArray.push(company);
    return company;
  }
}
