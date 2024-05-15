import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { INotification } from "src/shared/headers/interfaces/header.interface";

export interface IReduxState {
    authUser: IAuthUser;
    header: string;
    logout: boolean;
    notification: INotification;
  }