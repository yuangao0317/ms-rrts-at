import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Password {
  static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await authService.forgotPassword(req.body.email);
      res.status(StatusCodes.OK).json({ message: response.data.message });
    } catch (err) {
      next(err);
    }
  }
}
