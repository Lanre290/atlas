import { Request, Response } from 'express';
import { QueryEngine } from '../../engine/query-engine/queryEngine';
import { EntityResolver } from '../../engine/resolvers/entityResolver';

export class SearchController {
  // Inject the new EntityResolver instead of SearchResolver
  constructor(private queryEngine: QueryEngine, private resolver: EntityResolver) {}

  async search(req: Request, res: Response) {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ error: 'Missing query parameter q' });
    
    const results = await this.queryEngine.execute('Search', query);
    
    // Resolver now outputs a unified semantic graph
    const entities = this.resolver.resolve(results);
    
    res.json({ query, entities });
  }
}