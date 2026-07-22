import { Capability } from '../../types/capability';
import { CapabilityRegistry } from '../registry/capabilityRegistry';
import { Provider } from '../../types/provider';

export class QueryEngine {
  constructor(private registry: CapabilityRegistry) {}

  /**
   * Executes all providers supporting the given capability concurrently.
   * Returns an array of normalized Atlas models (one per provider).
   * The QueryEngine is provider-agnostic and does not know provider details.
   */
  async execute(capability: Capability, ...args: any[]): Promise<any[]> {
    const providers = this.registry.getProvidersFor(capability);
    // Run all providers concurrently
    const results = await Promise.allSettled(
      providers.map(provider => {
        switch (capability) {
          case 'Planet':
            return provider.getPlanet ? provider.getPlanet(args[0]) : Promise.resolve(null);
          case 'PlanetList':
            return provider.listPlanets ? provider.listPlanets(args[0]) : Promise.resolve([]);
          case 'Mission':
            return provider.getMission ? provider.getMission(args[0]) : Promise.resolve(null);
          case 'Image':
            return provider.getImages ? provider.getImages(args[0]) : Promise.resolve([]);
          case 'Asteroid':
            return provider.getAsteroid ? provider.getAsteroid(args[0]) : Promise.resolve(null);
          case 'AsteroidList':
            return provider.listAsteroids ? provider.listAsteroids(args[0]) : Promise.resolve([]);
          case 'Search':
            return provider.search ? provider.search(args[0]) : Promise.resolve([]);
          case 'Mission':
            return provider.getMission ? provider.getMission(args[0]) : Promise.resolve(null);
          case 'MissionList':
            return provider.listMissions ? provider.listMissions(args[0]) : Promise.resolve([]);
          default:
            return Promise.resolve(null);
        }
      })
    );
    // return an array (one entry per provider)
    return results.map(r => (r.status === 'fulfilled' ? r.value : null));
  }
}
