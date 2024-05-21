import { config } from '@auth/config';
import { winstonLogger, IAuthDocument, firstLetterUppercase, lowerCase } from '@yuangao0317/ms-rrts-at-shared-common';
import { UserModel } from '@auth/models/auth';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authService', 'debug');

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument | undefined> {
  try {
    const result: Model = await UserModel.create(data);

    const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
    return userData;
  } catch (error) {
    log.error(error);
  }
}

export async function getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await UserModel.findOne({
      where: { [Op.or]: [{ username: firstLetterUppercase(username) }, { email: lowerCase(email) }] }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getUserByUsername(username: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await UserModel.findOne({
      where: { username: firstLetterUppercase(username) }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getUserByEmail(email: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await UserModel.findOne({
      where: { email: lowerCase(email) }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function updateProfilePicture(authId: number, profilePublicId: string, profilePictureUrl: string): Promise<void> {
  try {
    await UserModel.update(
      {
        profilePublicId,
        profilePicture: profilePictureUrl
      },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserById(authId: number): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await UserModel.findOne({
      where: { id: authId },
      attributes: {
        exclude: ['password']
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserByVerificationToken(token: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await UserModel.findOne({
      where: { emailVerificationToken: token },
      attributes: {
        exclude: ['password']
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function updateVerifyEmailField(authId: number, emailVerified: number, emailVerificationToken?: string): Promise<void> {
  try {
    await UserModel.update(
      !emailVerificationToken
        ? {
            emailVerified
          }
        : {
            emailVerified,
            emailVerificationToken
          },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

export async function deleteUserById(authId: number): Promise<void> {
  try {
    const user: Model = (await UserModel.findOne({ where: { id: authId } })) as Model;
    if (user) {
      await user.destroy();
    }
  } catch (error) {
    log.error(error);
  }
}

export async function updatePasswordToken(authId: number, token: string, tokenExpiration: Date): Promise<void> {
  try {
    await UserModel.update(
      {
        passwordResetToken: token,
        passwordResetExpires: tokenExpiration
      },
      { where: { id: authId } }
    );
  } catch (error) {
    log.error(error);
  }
}

export function signToken(id: number, email: string, username: string): string {
  return sign(
    {
      id,
      email,
      username
    },
    config.JWT_TOKEN!
  );
}
