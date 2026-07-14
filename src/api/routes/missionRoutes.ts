// src/api/routes/missionRoutes.ts
import { Router } from 'express';
import { MissionController } from '../controllers/missionController';

export function createMissionRoutes(controller: MissionController) {
  const router = Router();
  router.get('/', (req, res) => controller.listMissions(req, res));
  router.get('/:id', (req, res) => controller.getMission(req, res));
  return router;
}