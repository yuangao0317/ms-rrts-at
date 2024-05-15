import express, { Router } from 'express';
import { token } from '@auth/controllers/refresh-token';

const router: Router = express.Router();

export function currentUserRoutes(): Router {
  router.get('/refresh-token/:username', token);
  return router;
}
