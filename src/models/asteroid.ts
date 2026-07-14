// src/models/asteroid.ts
export interface Asteroid {
  id: string;
  name: string;
  absoluteMagnitude?: number;
  estimatedDiameterKm?: { min: number; max: number };
  isPotentiallyHazardous?: boolean;
  orbitClass?: string;
  discoveryDate?: string;
  closeApproachData?: Array<{
    date: string;
    missDistanceKm: number;
    relativeVelocityKps: number;
    orbitingBody: string;
  }>;
  sources: string[];
}
