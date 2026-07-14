import axios from 'axios';

export class SolarSystemClient {
  private baseUrl = 'https://api.le-systeme-solaire.net/rest/bodies';
  private apiKey = process.env.SOLAR_SYSTEM_API_KEY; 

  async getPlanet(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('SolarSystem API Error (getPlanet):', error.message);
      return null;
    }
  }

  async listPlanets(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}?filter[]=isPlanet,eq,true`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data.bodies || [];
    } catch (error: any) {
      console.error('SolarSystem API Error (listPlanets):', error.message);
      return [];
    }
  }
}