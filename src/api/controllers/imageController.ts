// src/api/controllers/imageController.ts
import { Request, Response } from 'express';
import { QueryEngine } from '../../engine/query-engine/queryEngine';
import { ImageResolver } from '../../engine/resolvers/imageResolver';

export class ImageController {
  constructor(private queryEngine: QueryEngine, private resolver: ImageResolver) {}

  async getImages(req: Request, res: Response) {
    const query = req.query.q as string | undefined;
    const results = await this.queryEngine.execute('Image', { query });
    const images = this.resolver.resolve(results);
    res.json({ images });
  }
}
