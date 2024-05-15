export interface ISignInPayload {
  [key: string]: string | null | undefined;
  username: string;
  password: string;
}
