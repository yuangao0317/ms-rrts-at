import express, { Router } from 'express';
import { token } from '@auth/controllers/refresh-token';
import { read, resendEmail } from '@auth/controllers/current-user';

const router: Router = express.Router();

export function currentUserRoutes(): Router {
  router.get('/refresh-token/:username', token);
  router.post('/resend-email', resendEmail);
  router.get('/currentuser', read);

  return router;
}
