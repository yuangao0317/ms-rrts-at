import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@yuangao0317/ms-rrts-at-shared-common';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Refresh {
  static async token(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getRefreshToken(req.params.username);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response, new BadRequestError(error.message, 'GatewayService Refresh.token method error'));
      res.status(StatusCodes.BAD_GATEWAY).json({ message: 'Failed to refresh token from authorization service.' });
    }
  }
}
