import { authService } from '@gateway/services/api/auth.service';
import { BadGatewayError } from '@yuangao0317/ms-rrts-at-shared-common';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VerifyEmail {
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.verifyEmail(req.body.token);
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response, new BadGatewayError(error.message, 'GatewayService VerifyEmail.update method error'));
      res.status(StatusCodes.BAD_GATEWAY).json({
        message: 'Failed to verify email from authorization service.',
        error: new BadGatewayError(error.message, 'GatewayService VerifyEmail.update method error')
      });
    }
  }
}
