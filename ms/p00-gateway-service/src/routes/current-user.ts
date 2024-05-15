import express, { Router } from 'express';
import { Refresh } from '@gateway/controllers/auth/refresh-token';
import { authMiddleware } from '@gateway/services/auth-middleware';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/refresh-token/:username', authMiddleware.checkAuthentication, Refresh.token);
    return this.router;
  }
}
export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
