import { SignIn } from '@gateway/controllers/auth/signin';
import { SignUp } from '@gateway/controllers/auth/signup';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignUp.create);
    this.router.post('/auth/signin', SignIn.read);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
