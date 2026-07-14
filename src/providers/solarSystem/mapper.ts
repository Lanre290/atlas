// src/providers/solarsystem/mapper.ts
import { Planet } from '../../models/planet';

export class SolarSystemMapper {
  static toPlanet(data: any): Planet {
    
    // Format Mass
    let formattedMass = undefined;
    if (data.mass && data.mass.massValue && data.mass.massExponent) {
      formattedMass = `${data.mass.massValue} × 10^${data.mass.massExponent} kg`;
    }

    // Format Volume
    let formattedVolume = undefined;
    if (data.vol && data.vol.volValue && data.vol.volExponent) {
      formattedVolume = `${data.vol.volValue} × 10^${data.vol.volExponent} km³`;
    }

    // Format Moons
    let mappedMoons = [];
    if (data.moons && Array.isArray(data.moons)) {
      mappedMoons = data.moons.map((m: any) => ({
        name: m.moon,
        url: m.rel
      }));
    }

    return {
      id: data.id,
      name: data.name, // The original native name 
      englishName: data.englishName,
      alternativeName: data.alternativeName,
      type: data.bodyType || 'Planet',
      
      // Physical Characteristics
      gravity: data.gravity, 
      density: data.density,
      mass: formattedMass,
      volume: formattedVolume,
      meanRadius: data.meanRadius,
      equatorialRadius: data.equaRadius,
      polarRadius: data.polarRadius,
      flattening: data.flattening,
      escapeVelocity: data.escape, 
      temperature: data.avgTemp, 
      axialTilt: data.axialTilt,
      
      // Orbital Characteristics
      orbitalPeriod: data.sideralOrbit, 
      rotationPeriod: data.sideralRotation,
      semimajorAxis: data.semimajorAxis,
      perihelion: data.perihelion,
      aphelion: data.aphelion,
      eccentricity: data.eccentricity,
      inclination: data.inclination,
      mainAnomaly: data.mainAnomaly,
      argumentOfPeriapsis: data.argPeriapsis,
      longitudeOfAscendingNode: data.longAscNode,
      
      // Moons & Discovery
      moonsCount: mappedMoons.length,
      moons: mappedMoons,
      discoveredBy: data.discoveredBy || undefined,
      discoveryDate: data.discoveryDate || undefined,

      sources: ['Le Système Solaire']
    } as Planet; 
  }
}