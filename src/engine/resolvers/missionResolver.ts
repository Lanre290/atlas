import { Mission } from '../../models/mission';

export class MissionResolver {
  resolveSingle(missions: (Mission | null)[]): Mission | null {
    const valid = missions.filter(Boolean) as Mission[];
    if (valid.length === 0) return null;
    
    // Merge fields from multiple providers, prioritizing the first one found
    const merged: Mission = { ...valid[0], sources: [] };
    for (const field of Object.keys(merged) as (keyof Mission)[]) {
      for (const mission of valid) {
        if (mission[field] !== undefined) {
          (merged as any)[field] = mission[field];
          break;
        }
      }
    }
    // Combine attribution sources safely
    merged.sources = Array.from(new Set(valid.flatMap(m => m.sources)));
    return merged;
  }

  resolveList(missionsArr: (Mission[] | null)[]): Mission[] {
    const all = missionsArr.flat().filter(Boolean) as Mission[];
    const seen = new Map<string, Mission>();
    
    for (const mission of all) {
      if (seen.has(mission.id)) {
        const existing = seen.get(mission.id)!;
        existing.sources = Array.from(new Set([...existing.sources, ...mission.sources]));
      } else {
        seen.set(mission.id, mission);
      }
    }
    return Array.from(seen.values());
  }
}