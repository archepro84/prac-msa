import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [HeroModule, CompanyModule],
})
export class AppModule {}
