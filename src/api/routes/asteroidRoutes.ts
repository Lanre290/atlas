import { Router } from 'express';
import { AsteroidController } from '../controllers/asteroidController';

export function createAsteroidRoutes(controller: AsteroidController) {
  const router = Router();
  router.get('/', (req, res) => controller.listAsteroids(req, res));
  router.get('/:id', (req, res) => controller.getAsteroid(req, res));
  return router;
}
