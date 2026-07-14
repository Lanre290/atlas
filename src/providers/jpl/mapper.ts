// src/providers/jpl/mapper.ts
import { Asteroid } from '../../models/asteroid';

export class JplMapper {
  static toAsteroid(data: any): Asteroid {
    const phys = data.phys_par || {};
    return {
      id: data.object?.spkid || data.object?.des || '',
      name: data.object?.fullname || data.object?.des || '',
      absoluteMagnitude: phys.H,
      estimatedDiameterKm: phys.diameter ? { min: phys.diameter, max: phys.diameter } : undefined,
      isPotentiallyHazardous: undefined, // Not directly available
      orbitClass: data.object?.class,
      discoveryDate: data.object?.discovery,
      closeApproachData: [], // Not available in this endpoint
      sources: ['JPL'],
    };
  }
}
