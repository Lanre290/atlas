import { Capability } from '../../types/capability';
import { Provider } from '../../types/provider';

export class CapabilityRegistry {
  private providers: Provider[] = [];

  register(provider: Provider) {
    this.providers.push(provider);
  }

  getProvidersFor(capability: Capability): Provider[] {
    return this.providers.filter(p => p.capabilities().includes(capability));
  }
}
