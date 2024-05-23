import crypto from 'crypto';

import { getAuthUserById, getUserByEmail, updateVerifyEmailField } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument, IEmailMessageDetails, lowerCase } from '@yuangao0317/ms-rrts-at-shared-common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AUTH_NOTIFICATION_EMAIL_EX, AUTH_NOTIFICATION_EMAIL_RK, config } from '@auth/config';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';

export async function read(req: Request, res: Response): Promise<void> {
  let user = null;
  // req.currentUser is verified in api gateway from session data
  const existingUser: IAuthDocument | undefined = await getAuthUserById(req.currentUser!.id);
  if (!existingUser) {
    throw new BadRequestError('User does not exist', 'CurrentUser read() method error');
  }
  if (existingUser && Object.keys(existingUser).length) {
    user = existingUser;
  }
  res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
}

export async function resendEmail(req: Request, res: Response): Promise<void> {
  const { email, userId } = req.body;

  const checkIfUserExist: IAuthDocument | undefined = await getUserByEmail(lowerCase(email));
  if (!checkIfUserExist) {
    throw new BadRequestError('Email is invalid', 'CurrentUser resentEmail() method error');
  }

  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  await updateVerifyEmailField(parseInt(userId), 0, randomCharacters);
  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${randomCharacters}`;
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: lowerCase(email),
    verifyLink: verificationLink,
    template: 'verifyEmail'
  };
  await publishDirectMessage(
    authChannel,
    AUTH_NOTIFICATION_EMAIL_EX,
    AUTH_NOTIFICATION_EMAIL_RK,
    JSON.stringify(messageDetails),
    'Verify email message has been sent to notification service.'
  );

  const updatedUser = await getAuthUserById(parseInt(userId));
  res.status(StatusCodes.OK).json({ message: 'Email verification sent', user: updatedUser });
}
