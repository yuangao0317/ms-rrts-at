import { SignIn } from '@gateway/controllers/auth/signin';
import { Signout } from '@gateway/controllers/auth/signout';
import { SignUp } from '@gateway/controllers/auth/signup';
import { VerifyEmail } from '@gateway/controllers/auth/verify-email';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignUp.create);
    this.router.post('/auth/signin', SignIn.read);
    this.router.post('/auth/signout', Signout.update);
    this.router.put('/auth/verify-email', VerifyEmail.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
