import { Controller, Get } from '@nestjs/common';

@Controller()

  @Get()
  getHello(): string {
    return "Hello world";
  }
}
