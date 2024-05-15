export interface ISignInPayload {
  [key: string]: string | null | undefined;
  username: string;
  password: string;
}

export interface ISignUpPayload {
  [key: string]: string | null | undefined;
  username: string;
  password: string;
  email: string;
  country: string;
  profilePicture: string;
}

export interface IAuthUser {
  profilePublicId: string | null;
  country: string | null;
  createdAt: Date | null;
  email: string | null;
  emailVerificationToken: string | null;
  emailVerified: boolean | null;
  id: number | null;
  passwordResetExpires: Date | null;
  passwordResetToken: null | null;
  profilePicture: string | null;
  updatedAt: Date | null;
  username: string | null;
  browserName: string | null;
  deviceType: string | null;
}
