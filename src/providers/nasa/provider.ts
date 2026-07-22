import { Provider } from '../../types/provider';
import { Capability } from '../../types/capability';
import { NasaClient } from './client';
import { NasaMapper } from './mapper';
import { Image } from '../../models/image';
import { Asteroid } from '../../models/asteroid';
import { Mission } from '../../models/mission';

export class NasaProvider implements Provider {
  private client = new NasaClient();

  name() { return 'NASA'; }

  capabilities() { return ['Image', 'Asteroid', 'AsteroidList', 'Search', 'Mission', 'MissionList'] as Capability[]; }

  async getImages(filters: { query?: string }): Promise<Image[]> {
    try {
      const items = await this.client.searchImages(filters.query || '');
      return NasaMapper.toImages(items);
    } catch (err) {
      return [];
    }
  }

  async getAsteroid(id: string): Promise<Asteroid | null> {
    try {
      const data = await this.client.getAsteroid(id);
      if (!data) return null;
      return NasaMapper.toAsteroid(data);
    } catch (err) {
      return null;
    }
  }

  async listAsteroids(filters: any): Promise<Asteroid[]> {
    try {
      const items = await this.client.listAsteroids(filters);
      return items.map(NasaMapper.toAsteroid);
    } catch (err) {
      return [];
    }
  }

  async search(query: string) {
    try {
      const items = await this.client.searchImages(query);
      
      // Map NASA image search results to Atlas SearchResult including the url
      return items.map((item: any) => {
        const data = item.data[0];
        const imageUrl = item.links?.[0]?.href;
        
        return {
          type: 'image',
          id: data.nasa_id,
          title: data.title,
          thumbnailUrl: imageUrl,
          url: imageUrl,
          source: 'NASA',
        };
      });
    } catch (err) {
      return [];
    }
  }


  async getMission(id: string): Promise<Mission | null> {
    try {
      const data = await this.client.getMission(id);
      return data ? NasaMapper.toMission(data) : null;
    } catch (err) {
      return null;
    }
  }

  async listMissions(filters: { query?: string, limit?: number, page?: number }): Promise<Mission[]> {
    try {
      // 1. Get the massive array of bare IDs
      const bareItems = await this.client.searchMissions(filters.query || '');
      
      // 2. Set up the pagination variables safely
      const limit = filters.limit || 20;
      const safeLimit = Math.min(limit, 100); // Max 100 per page to protect API key
      const page = filters.page || 1;
      
      // 3. Calculate the array slice bounds
      const startIndex = (page - 1) * safeLimit;
      const endIndex = page * safeLimit;
      
      // 4. Extract exactly the chunk of IDs for the requested page
      const pageItems = bareItems.slice(startIndex, endIndex);
      
      // 5. Fetch the deep details concurrently just for this page's slice
      const detailedMissions = await Promise.all(
        pageItems.map(async (item: any) => {
          const id = item.projectId || item.id;
          if (!id) return NasaMapper.toMission(item);
          
          const detail = await this.client.getMission(id.toString());
          return detail ? NasaMapper.toMission(detail) : NasaMapper.toMission(item);
        })
      );

      return detailedMissions;
    } catch (err) {
      console.error('NasaProvider listMissions Error:', err);
      return [];
    }
  }
}