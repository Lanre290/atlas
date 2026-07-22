import axios from 'axios';

export class JplClient {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.JPL_SBDB_API_URL || 'https://ssd-api.jpl.nasa.gov/sbdb.api';
  }

  async getAsteroid(id: string): Promise<any> {
    // JPL SBDB API expects 'sstr' param (designation, name, or SPK-ID)
    const url = `${this.baseUrl}?sstr=${encodeURIComponent(id)}`;
    const response = await axios.get(url);
    return response.data;
  }
}
