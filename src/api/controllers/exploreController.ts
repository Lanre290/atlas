import { Request, Response } from 'express';
import { QueryEngine } from '../../engine/query-engine/queryEngine';
import { ImageResolver } from '../../engine/resolvers/imageResolver';
import { MissionResolver } from '../../engine/resolvers/missionResolver';
import { EntityResolver } from '../../engine/resolvers/entityResolver';

export class ExploreController {
  constructor(
    private queryEngine: QueryEngine,
    private imageResolver: ImageResolver,
    private missionResolver: MissionResolver,
    private entityResolver: EntityResolver
  ) {}

  async explore(req: Request, res: Response) {
    const query = req.params.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Missing exploration query' });
    }

    try {
      // 1. Execute all domain queries concurrently via the Query Engine
      // We pass the search term to the capabilities that accept text queries
      const [imageResults, missionResults, searchResults] = await Promise.all([
        this.queryEngine.execute('Image', { query }),
        this.queryEngine.execute('MissionList', { query, limit: 5 }), // Cap missions to keep it fast
        this.queryEngine.execute('Search', query)
      ]);

      // 2. Resolve the raw provider arrays using your existing domain resolvers
      // (Assuming your ImageResolver has a standard resolve method similar to the others)
      const images = this.imageResolver.resolve(imageResults); 
      const missions = this.missionResolver.resolveList(missionResults);
      const entities = this.entityResolver.resolve(searchResults);

      // 3. Construct a basic deterministic summary (No AI)
      let summary = `Exploration overview for '${query}'.`;
      if (entities.length > 0) {
        summary += ` Identified as a known entity (${entities[0].name}).`;
      }
      if (missions.length > 0) {
        summary += ` Associated with ${missions.length} recorded space missions.`;
      }

      // 4. Return the unified aggregation
      res.json({
        query,
        summary,
        images,
        missions,
        related: entities
      });

    } catch (error) {
      console.error('Explore Orchestration Error:', error);
      res.status(500).json({ error: 'Failed to aggregate exploration data' });
    }
  }
}