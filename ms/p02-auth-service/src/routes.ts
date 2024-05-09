import { Application } from 'express';
import { healthRoutes } from '@auth/routes/health';

// const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
}
