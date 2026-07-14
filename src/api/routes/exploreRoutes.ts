import { Router } from 'express';
import { ExploreController } from '../controllers/exploreController';

export function createExploreRoutes(controller: ExploreController) {
  const router = Router();
  
  router.get('/:query', (req, res) => controller.explore(req, res));
  
  return router;
}