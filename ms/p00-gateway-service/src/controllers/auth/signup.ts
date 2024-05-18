import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@yuangao0317/ms-rrts-at-shared-common';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignUp {
  static async create(req: Request, res: Response): Promise<void> {
    console.log('signup');
    try {
      const response: AxiosResponse = await authService.signUp(req.body);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response, new BadRequestError(error.message, 'GatewayService SignUp.create method error'));
      res.status(StatusCodes.BAD_GATEWAY).json({ message: 'Signup failed. Failed to connect to authorization service.' });
    }
  }
}
