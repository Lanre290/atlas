// src/api/controllers/planetController.ts
import { Request, Response } from 'express';
import { QueryEngine } from '../../engine/query-engine/queryEngine';
import { PlanetResolver } from '../../engine/resolvers/planetResolver';

// src/api/controllers/planetController.ts
export class PlanetController {
  constructor(private queryEngine: QueryEngine, private resolver: PlanetResolver) {}

  async getPlanet(req: Request, res: Response) {
    const id = req.params.id;
    const results = await this.queryEngine.execute('Planet', id); //
    const planet = this.resolver.resolve(results); //
    if (planet) { //
      res.json({ planet }); //
    } else { //
      res.status(404).json({ error: 'Planet not found' }); //
    }
  }

  // Add this new method
  async listPlanets(req: Request, res: Response) {
    // 1. Ask the engine to query all providers with the 'PlanetList' capability
    const results = await this.queryEngine.execute('PlanetList', {}); 
    
    // 2. Resolve and merge the raw provider results
    const planets = this.resolver.resolveList(results);
    
    // 3. Return the clean list!
    res.json({ planets }); 
  }
}