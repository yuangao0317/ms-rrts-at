import { UserModel } from '@auth/models/auth';
import { loginSchema } from '@auth/schemas/signin';
import { getUserByEmail, getUserByUsername, signToken } from '@auth/services/auth.service';
import { isEmail } from '@auth/utils/validation.helper';
import { BadRequestError, IAuthDocument } from '@yuangao0317/ms-rrts-at-shared-common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { omit } from 'lodash';

export async function read(req: Request, res: Response): Promise<void> {
  const errorMsgComingFrom = 'Controller SignIn read() method error';
  const { error } = await Promise.resolve(loginSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignIn read() method error');
  }

  const { username, password } = req.body;
  const isValidEmail: boolean = isEmail(username);
  const existingUser: IAuthDocument | undefined = !isValidEmail ? await getUserByUsername(username) : await getUserByEmail(username);
  if (!existingUser) {
    throw new BadRequestError('User does not exist', errorMsgComingFrom);
  }

  const passwordsMatch: boolean = await UserModel.prototype.comparePassword(password, `${existingUser.password}`);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials', errorMsgComingFrom);
  }

  const userJWT: string = signToken(existingUser.id!, existingUser.email!, existingUser.username!);
  const userData: IAuthDocument = omit(existingUser, ['password']);

  res.status(StatusCodes.OK).json({ message: 'User login successfully', user: userData, token: userJWT });
}
