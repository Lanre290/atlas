import { Asteroid } from '../../models/asteroid';

export class AsteroidResolver {
  // Combines, deduplicates, and resolves conflicts using provider priority
  resolve(asteroids: (Asteroid | null)[]): Asteroid | null {
    const valid = asteroids.filter(Boolean) as Asteroid[];
    if (valid.length === 0) return null;
    // Example: prioritize JPL over NASA for orbit data
    const priority = ['JPL', 'NASA'];
    const merged: Asteroid = { ...valid[0], sources: [] };
    for (const field of Object.keys(merged)) {
      for (const provider of priority) {
        const match: any = valid.find((a: any) => a.sources.includes(provider) && a[field] !== undefined);
        if (match && match[field] !== undefined) {
          (merged as any)[field] = (match as any)[field];
          break;
        }
      }
    }
    merged.sources = Array.from(new Set(valid.flatMap(a => a.sources)));
    return merged;
  }
}
