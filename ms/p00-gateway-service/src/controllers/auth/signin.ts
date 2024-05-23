import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  static async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await authService.signIn(req.body);
      const { message, user, token, browserName, deviceType } = response.data;
      req.session = { jwt: token };
      res.status(StatusCodes.OK).json({ message, user, browserName, deviceType });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      // console.error(error.response, new BadGatewayError(error.message, 'GatewayService SignIn.read method error'));
      // res.status(StatusCodes.BAD_GATEWAY).json({
      //   message: 'SignIn failed. Failed to connect to authorization service.',
      //   error: new BadGatewayError(error.message, 'GatewayService SignIn.read method error')
      // });
      next(err);
    }
  }
}
