import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Hero, HeroById, HeroesService } from '../../proto/build/hero';

@Controller()
export class AppController {
  private readonly heroArray: Hero[] = [
    {
      id: 1,
      firstName: 'foo1',
      lastName: 'bar1',
    },
    {
      id: 2,
      firstName: 'foo2',
      lastName: 'bar2',
    },
  ];

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById) {
    return this.heroArray.find(({ id }) => id === data.id);
  }

  @GrpcMethod('HeroesService', 'FindAll')
  findAll() {
    return this.heroArray;
  }
}
