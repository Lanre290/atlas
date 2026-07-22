import { Provider } from '../../types/provider';
import { Capability } from '../../types/capability';
import { SolarSystemClient } from './client';
import { SolarSystemMapper } from './mapper';
import { Planet } from '../../models/planet';

export class SolarSystemProvider implements Provider {
  private client = new SolarSystemClient();

  name() { return 'SolarSystem API'; }

  capabilities() { return ['Planet', 'PlanetList'] as Capability[]; }

  async getPlanet(id: string): Promise<Planet | null> {
    const data = await this.client.getPlanet(id);
    if (!data) return null;
    return SolarSystemMapper.toPlanet(data);
  }

  async listPlanets(filters: any): Promise<Planet[]> {
    const data = await this.client.listPlanets();
    return data.map(SolarSystemMapper.toPlanet);
  }
}