import { Router } from 'express';
import { SearchController } from '../controllers/searchController';

export function createSearchRoutes(controller: SearchController) {
  const router = Router();
  router.get('/', (req, res) => controller.search(req, res));
  return router;
}
