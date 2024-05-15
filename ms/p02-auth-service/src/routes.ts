import { Application } from 'express';
import { verifyGatewayRequest } from '@yuangao0317/ms-rrts-at-shared-common';
import { healthRoutes } from '@auth/routes/health';
import { authRoutes } from '@auth/routes/auth';
import { currentUserRoutes } from '@auth/routes/current-user';

const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());

  app.use(BASE_PATH, verifyGatewayRequest, authRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, currentUserRoutes());
}
