// src/providers/nasa/mapper.ts
import { Image } from '../../models/image';
import { Asteroid } from '../../models/asteroid';
import { Mission } from '../../models/mission';

export class NasaMapper {
  static toImages(items: any[]): Image[] {
    return items.map(item => {
      const data = item.data[0];
      const link = item.links?.[0]?.href;
      return {
        id: data.nasa_id,
        url: link,
        title: data.title,
        description: data.description,
        sources: ['NASA']
      };
    });
  }

  static toAsteroid(data: any): Asteroid {
    return {
      id: data.id,
      name: data.name,
      absoluteMagnitude: data.absolute_magnitude_h,
      estimatedDiameterKm: data.estimated_diameter?.kilometers
        ? {
            min: data.estimated_diameter.kilometers.estimated_diameter_min,
            max: data.estimated_diameter.kilometers.estimated_diameter_max,
          }
        : undefined,
      isPotentiallyHazardous: data.is_potentially_hazardous_asteroid,
      orbitClass: data.orbital_data?.orbit_class?.orbit_class_type,
      discoveryDate: data.orbital_data?.first_observation_date,
      closeApproachData: data.close_approach_data?.map((c: any) => ({
        date: c.close_approach_date,
        missDistanceKm: Number(c.miss_distance.kilometers),
        relativeVelocityKps: Number(c.relative_velocity.kilometers_per_second),
        orbitingBody: c.orbiting_body,
      })),
      sources: ['NASA'],
    };
  }

  static toMission(data: any): Mission {
    // NASA TechPort nests the detailed data inside a 'project' object
    const project = data.project || data;

    // Safely extract destinations (targets)
    const targets = project.destinations 
      ? project.destinations.map((d: any) => d.description || d).join(', ') 
      : undefined;

    // Safely extract Principal Investigators
    const pis = project.principalInvestigators 
      ? project.principalInvestigators.map((pi: any) => pi.name || pi.fullName) 
      : [];

    // Clean up NASA's description (they sometimes send raw HTML tags)
    let cleanDescription = project.description;
    if (cleanDescription) {
      cleanDescription = cleanDescription.replace(/<[^>]*>?/gm, '').trim(); 
    }

    return {
      id: project.id?.toString() || project.projectId?.toString() || '',
      name: project.title || project.name || 'Unknown Mission',
      description: cleanDescription,
      agency: 'NASA',
      leadOrganization: project.leadOrganization?.name,
      target: targets,
      status: project.statusDescription || project.status,
      launchDate: project.startDateString || project.start_date,
      endDate: project.endDateString || project.end_date,
      website: project.website || project.projectWebsite,
      principalInvestigators: pis.length > 0 ? pis : undefined,
      sources: ['NASA'],
    };
  }
}
