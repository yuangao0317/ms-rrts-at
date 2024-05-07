import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IAuthPayload, NotAuthorizedError } from '@yuangao0317/ms-rrts-at-shared-common';
import { config } from '@gateway/config';

class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available. Please login again.', 'GatewayService verifyUser() method error');
    }

    try {
      // JWT payload data structure: https://datatracker.ietf.org/doc/html/rfc7519#section-4.1 
      const payload: IAuthPayload = verify(req.session?.jwt, `${config.JWT_TOKEN}`) as IAuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError(
        'Token is not available. Please login again.',
        'GatewayService verifyUser() method invalid session error'
      );
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
