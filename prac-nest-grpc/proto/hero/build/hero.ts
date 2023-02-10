/* eslint-disable */
import { Observable } from "rxjs";

export const protobufPackage = "hero";

export interface Hero {
  id: number;
  firstName: string;
  lastName: string;
}

export interface HeroById {
  id: number;
}

export interface CreateHero {
  firstName: string;
  lastName: string;
}

export interface Empty {
}

export interface HeroesService {
  Create(request: CreateHero): Promise<Hero>;
  FindOne(request: HeroById): Promise<Hero>;
  FindAll(request: Empty): Observable<Hero>;
}
