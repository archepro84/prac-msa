import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateHero, Hero, HeroById, HeroesService } from '../../proto/build/hero';

@Controller()
export class AppController {
  private heroArray: Hero[] = [
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

  @GrpcMethod('HeroesService', 'Create')
  Create(createHero: CreateHero) {
    const heroId = Math.max(...this.heroArray.map((hero) => hero.id), 0) + 1;
    const hero: Hero = {
      id: heroId,
      ...createHero
    };
    this.heroArray.push(hero);
    return hero;
  }
}
