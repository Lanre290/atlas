import { Request, Response } from 'express';
import { QueryEngine } from '../../engine/query-engine/queryEngine';
import { MissionResolver } from '../../engine/resolvers/missionResolver';

export class MissionController {
  constructor(private queryEngine: QueryEngine, private resolver: MissionResolver) {}

  async getMission(req: Request, res: Response) {
    const id = req.params.id;
    const results = await this.queryEngine.execute('Mission', id);
    const mission = this.resolver.resolveSingle(results);
    
    if (mission) {
      res.json({ mission });
    } else {
      res.status(404).json({ error: 'Mission not found' });
    }
  }

  async listMissions(req: Request, res: Response) {
    const { q, limit, page } = req.query;
    const filters: any = {};
    if (q) filters.query = q as string;
    
    // Parse pagination params with safe defaults
    filters.limit = limit ? parseInt(limit as string, 10) : 20;
    filters.page = page ? parseInt(page as string, 10) : 1;

    const results = await this.queryEngine.execute('MissionList', filters);
    const missions = this.resolver.resolveList(results);
    
    // Wrap the response with helpful pagination metadata
    res.json({ 
      meta: {
        page: filters.page,
        limit: filters.limit,
        returned: missions.length
      },
      missions 
    });
  }
}