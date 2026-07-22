import { Provider } from '../../types/provider';
import { Capability } from '../../types/capability';
import { JplClient } from './client';
import { JplMapper } from './mapper';
import { Asteroid } from '../../models/asteroid';

export class JplProvider implements Provider {
  private client = new JplClient();
  name() { return 'JPL'; }
  capabilities() { return ['Asteroid'] as Capability[]; }

  async getAsteroid(id: string): Promise<Asteroid | null> {
    try {
      const data = await this.client.getAsteroid(id);
      if (!data || !data.object) return null;
      return JplMapper.toAsteroid(data);
    } catch (err) {
      return null;
    }
  }
}
