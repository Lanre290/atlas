// src/models/planet.ts
export interface Planet {
  id: string;
  name: string;
  englishName?: string;
  alternativeName?: string;
  type: string;

  // Physical Characteristics
  gravity?: number;            // Surface gravity in m/s²
  density?: number;            // Density in g/cm³
  mass?: string;               // Formatted string (e.g., "8.68 × 10^25 kg")
  volume?: string;             // Formatted string (e.g., "6.83 × 10^13 km³")
  meanRadius?: number;         // Mean radius in km
  equatorialRadius?: number;   // Equatorial radius in km
  polarRadius?: number;        // Polar radius in km
  flattening?: number;         // Oblateness/flattening
  escapeVelocity?: number;     // Escape velocity in m/s
  temperature?: number;        // Average temperature in Kelvin
  axialTilt?: number;          // Axial tilt in degrees

  // Orbital Characteristics
  orbitalPeriod?: number;      // Time to orbit the sun in Earth days (sideralOrbit)
  rotationPeriod?: number;     // Time to rotate on axis in hours (sideralRotation)
  semimajorAxis?: number;      // Semi-major axis in km
  perihelion?: number;         // Closest approach to the sun in km
  aphelion?: number;           // Furthest distance from the sun in km
  eccentricity?: number;       // Orbital eccentricity
  inclination?: number;        // Orbital inclination in degrees
  mainAnomaly?: number;        // Mean anomaly in degrees
  argumentOfPeriapsis?: number;// Argument of periapsis in degrees
  longitudeOfAscendingNode?: number; // Longitude of ascending node in degrees

  // Moons & Discovery
  moonsCount?: number;
  moons?: { name: string; url: string }[];
  discoveredBy?: string;
  discoveryDate?: string;

  sources: string[];
}