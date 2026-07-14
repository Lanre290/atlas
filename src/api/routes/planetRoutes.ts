// src/api/routes/planetRoutes.ts
import { Router } from 'express';
import { PlanetController } from '../controllers/planetController';

export function createPlanetRoutes(controller: PlanetController) {
  const router = Router();
  
  // Add this line to handle GET /planets
  router.get('/', (req, res) => controller.listPlanets(req, res)); 
  
  router.get('/:id', (req, res) => controller.getPlanet(req, res)); //
  return router;
}