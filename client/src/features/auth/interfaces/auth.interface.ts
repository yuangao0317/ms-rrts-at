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
