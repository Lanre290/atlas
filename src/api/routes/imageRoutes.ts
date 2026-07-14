// src/api/routes/imageRoutes.ts
import { Router } from 'express';
import { ImageController } from '../controllers/imageController';

export function createImageRoutes(controller: ImageController) {
  const router = Router();
  router.get('/', (req, res) => controller.getImages(req, res));
  return router;
}
