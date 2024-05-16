import express, { Router } from 'express';
import { Refresh } from '@gateway/controllers/auth/refresh-token';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { CurrentUser } from '@gateway/controllers/auth/current-user';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/refresh-token/:username', authMiddleware.checkAuthentication, Refresh.token);
    this.router.post('/auth/resend-email', authMiddleware.checkAuthentication, CurrentUser.resendEmail);
    this.router.get('/auth/currentuser', authMiddleware.checkAuthentication, CurrentUser.read);

    return this.router;
  }
}
export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
