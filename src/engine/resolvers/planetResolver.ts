// src/engine/resolvers/planetResolver.ts
import { Planet } from '../../models/planet';

export class PlanetResolver {
  
  resolve(planets: (Planet | null)[]): Planet | null {
    // 1. Filter out nulls
    const valid = planets.filter(Boolean) as Planet[];
    if (valid.length === 0) return null;

    // 2. Merge fields from multiple providers
    const merged: Planet = { ...valid[0], sources: [] };
    for (const field of Object.keys(merged) as (keyof Planet)[]) {
      for (const planet of valid) {
        if (planet[field] !== undefined && planet[field] !== null) {
          (merged as any)[field] = planet[field];
          break; // Stop looking once we find a provider that has this field
        }
      }
    }

    // 3. Combine attribution sources safely
    merged.sources = Array.from(new Set(valid.flatMap(p => p.sources || [])));
    
    return merged;
  }

  resolveList(planetsArr: (Planet[] | null)[]): Planet[] {
    const all = planetsArr.flat().filter(Boolean) as Planet[];
    const seen = new Map<string, Planet>();
    
    for (const planet of all) {
      if (seen.has(planet.id)) {
        const existing = seen.get(planet.id)!;
        existing.sources = Array.from(new Set([...existing.sources, ...(planet.sources || [])]));
      } else {
        seen.set(planet.id, planet);
      }
    }
    
    return Array.from(seen.values());
  }
}