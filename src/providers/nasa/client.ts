import axios from 'axios';

export class NasaClient {
  private imageBaseUrl: string;
  private asteroidBaseUrl: string;
  private apiKey: string | undefined;

  constructor() {
    this.imageBaseUrl = process.env.NASA_IMAGE_API_URL || 'https://images-api.nasa.gov';
    this.asteroidBaseUrl = process.env.NASA_NEO_API_URL || 'https://api.nasa.gov/neo/rest/v1/neo';
    this.apiKey = process.env.NASA_API_KEY;
  }

  async searchImages(query: string): Promise<any[]> {
    const url = `${this.imageBaseUrl}/search?q=${encodeURIComponent(query)}&media_type=image`;
    const response = await axios.get(url);
    return response.data.collection.items;
  }

  async getAsteroid(id: string): Promise<any> {
    const url = `${this.asteroidBaseUrl}/${id}${this.apiKey ? `?api_key=${this.apiKey}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  }

  async listAsteroids(filters: { limit?: number; hazardous?: boolean; near_earth?: boolean }): Promise<any[]> {
    let url = `${this.asteroidBaseUrl}/browse?${this.apiKey ? `api_key=${this.apiKey}` : ''}`;
    if (filters.limit) url += `&size=${filters.limit}`;
    // NASA API does not support hazardous/near_earth filters directly in browse
    const response = await axios.get(url);
    let asteroids = response.data.near_earth_objects || [];
    if (filters.hazardous !== undefined) {
      asteroids = asteroids.filter((a: any) => a.is_potentially_hazardous_asteroid === filters.hazardous);
    }
    // near_earth filter is not directly supported; all are NEOs
    return asteroids;
  }

  async searchMissions(query: string): Promise<any[]> {
    const baseUrl = 'https://api.nasa.gov/techport/api/projects';
    const auth = `api_key=${this.apiKey || 'DEMO_KEY'}`;
    const url = query 
      ? `${baseUrl}?searchQuery=${encodeURIComponent(query)}&${auth}` 
      : `${baseUrl}?${auth}`;

    try {
      const response = await axios.get(url);
      return response.data?.projects?.projects || response.data?.projects || [];
    } catch (err: any) {
      // ADD THIS LOG so it stops failing silently!
      console.error('NASA TechPort API Error:', err.response?.data?.error || err.message);
      return []; 
    }
  }

  async getMission(id: string): Promise<any> {
    const url = `https://api.nasa.gov/techport/api/projects/${id}?api_key=${this.apiKey || 'DEMO_KEY'}`;
    const response = await axios.get(url);
    return response.data?.project;
  }
}
