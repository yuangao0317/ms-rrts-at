import crypto from 'crypto';

import { forgotPasswordEmailSchema, resetPasswordSchema } from '@auth/schemas/password';
import { getAuthUserByPasswordToken, getUserByEmail, updatePassword, updatePasswordToken } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument, IEmailMessageDetails } from '@yuangao0317/ms-rrts-at-shared-common';
import { AUTH_NOTIFICATION_EMAIL_EX, AUTH_NOTIFICATION_EMAIL_RK, config } from '@auth/config';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { UserModel } from '@auth/models/auth';

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(forgotPasswordEmailSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Password forgotPassword() method error');
  }
  const { email } = req.body;
  const existingUser: IAuthDocument | undefined = await getUserByEmail(email);
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials', 'Password forgotPassword() method error');
  }
  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  const date: Date = new Date();
  date.setHours(date.getHours() + 1);
  await updatePasswordToken(existingUser.id!, randomCharacters, date);
  const resetLink = `${config.CLIENT_URL}/reset_password?token=${randomCharacters}`;
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: existingUser.email,
    resetLink,
    username: existingUser.username,
    template: 'forgotPassword'
  };
  await publishDirectMessage(
    authChannel,
    AUTH_NOTIFICATION_EMAIL_EX,
    AUTH_NOTIFICATION_EMAIL_RK,
    JSON.stringify(messageDetails),
    'Forgot password message sent to notification service.'
  );
  res.status(StatusCodes.OK).json({ message: 'Password reset email sent.' });
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(resetPasswordSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Password resetPassword() method error');
  }
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match', 'Password resetPassword() method error');
  }

  const existingUser: IAuthDocument | undefined = await getAuthUserByPasswordToken(token);
  if (!existingUser) {
    throw new BadRequestError('Reset token has expired', 'Password resetPassword() method error');
  }
  const hashedPassword: string = await UserModel.prototype.hashPassword(password);
  await updatePassword(existingUser.id!, hashedPassword);
  const messageDetails: IEmailMessageDetails = {
    username: existingUser.username,
    receiverEmail: existingUser.email,
    template: 'resetPasswordSuccess'
  };
  await publishDirectMessage(
    authChannel,
    AUTH_NOTIFICATION_EMAIL_EX,
    AUTH_NOTIFICATION_EMAIL_RK,
    JSON.stringify(messageDetails),
    'Reset password success message sent to notification service.'
  );
  res.status(StatusCodes.OK).json({ message: 'Password successfully updated.' });
}
