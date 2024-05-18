import { authService } from '@gateway/services/api/auth.service';
import { BadGatewayError, BadRequestError } from '@yuangao0317/ms-rrts-at-shared-common';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CurrentUser {
  static async read(_req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getCurrentUser();
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response, new BadRequestError(error.message, 'GatewayService CurrentUser.read method error'));
      res.status(StatusCodes.BAD_GATEWAY).json({ message: 'Failed to get current user from authorization service.' });
    }
  }

  static async resendEmail(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.resendEmail(req.body);
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response, new BadGatewayError(error.message, 'GatewayService CurrentUser.resendEmail method error'));
      res.status(StatusCodes.BAD_GATEWAY).json({
        message: 'Failed to resend email from authorization service.',
        error: new BadGatewayError(error.message, 'GatewayService CurrentUser.resendEmail method error')
      });
    }
  }
}
