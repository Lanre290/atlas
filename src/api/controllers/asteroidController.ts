// src/api/controllers/asteroidController.ts
import { Request, Response } from 'express';
import { QueryEngine } from '../../engine/query-engine/queryEngine';
import { AsteroidResolver } from '../../engine/resolvers/asteroidResolver';

export class AsteroidController {
  constructor(private queryEngine: QueryEngine, private resolver: AsteroidResolver) {}

  async getAsteroid(req: Request, res: Response) {
    const id = req.params.id;
    const results = await this.queryEngine.execute('Asteroid', id);
    const asteroid = this.resolver.resolve(results);
    if (asteroid) {
      res.json({ asteroid });
    } else {
      res.status(404).json({ error: 'Asteroid not found' });
    }
  }

  async listAsteroids(req: Request, res: Response) {
    // Only NASA supports asteroid listing
    const { limit, hazardous, near_earth } = req.query;
    const filters: any = {};
    if (limit) filters.limit = Number(limit);
    if (hazardous) filters.hazardous = hazardous === 'true';
    if (near_earth) filters.near_earth = near_earth === 'true';
    // Only NASA provider will respond
    const results = await this.queryEngine.execute('AsteroidList', filters);
    // Results is an array, take the first non-null
    const asteroids = results.find(r => Array.isArray(r)) || [];
    res.json({ asteroids });
  }
}
