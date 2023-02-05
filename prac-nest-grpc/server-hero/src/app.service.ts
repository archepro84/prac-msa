import { Injectable } from '@nestjs/common';
import { Hero, HeroById } from '../../proto/build/hero';

@Injectable()
export class AppService {
  private readonly hero: Hero;
  private readonly heroArray: Hero[];

  constructor() {
    this.hero = {
      id: 1,
      firstName: "foo1",
      lastName: "bar1"
    };

    this.heroArray = [
      this.hero,
      {
        id: 2,
        firstName: 'foo2',
        lastName: 'bar2'
      }
    ];
  }

  findOne(data: HeroById) {
    return this.heroArray.find(({ id }) => id === data.id);
  }


  findAll() {
    return this.heroArray;
  }
}
