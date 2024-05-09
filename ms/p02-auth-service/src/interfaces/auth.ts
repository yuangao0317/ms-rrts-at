export interface IAuthDocument {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  country?: string;
  profilePublicId?: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
  emailVerified?: number;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
