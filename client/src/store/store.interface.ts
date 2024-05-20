import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';

export interface IReduxState {
  header: string;
  authUser: IAuthUser;
  logout: boolean;
}
