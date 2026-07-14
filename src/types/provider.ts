// src/types/provider.ts
import { Capability } from './capability';
import { Planet } from '../models/planet';
import { Mission } from '../models/mission';
import { Image } from '../models/image';
import { Asteroid } from '../models/asteroid';
import { SearchResult } from '../models/searchResult';

export interface Provider {
  name(): string;
  capabilities(): Capability[];
  getPlanet?(id: string): Promise<Planet | null>;
  listPlanets?(filters: any): Promise<any[]>;
  getMission?(id: string): Promise<Mission | null>;
  getImages?(filters: any): Promise<Image[]>;
  search?(query: string): Promise<any[]>;
  getAsteroid?(id: string): Promise<Asteroid | null>;
  listAsteroids?(filters: any): Promise<Asteroid[]>;
  search?(query: string): Promise<SearchResult[]>;
  getMission?(id: string): Promise<Mission | null>;
  listMissions?(filters: any): Promise<Mission[]>;
}
