import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { headerValue } from 'src/shared/utils/constants';

export const initialAuthUserValues: IAuthUser = {
  profilePublicId: null,
  country: null,
  createdAt: null,
  email: null,
  emailVerificationToken: null,
  emailVerified: null,
  id: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  profilePicture: null,
  updatedAt: null,
  username: null,
  browserName: null,
  deviceType: null
} as const;

export const initialLogoutValue: boolean = true;

// index | home
export const initialHeaderValue: string = headerValue.index;
