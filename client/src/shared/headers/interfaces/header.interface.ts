import { Dispatch, SetStateAction } from 'react';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';

export interface IHeader {
  navClass: string;
}

export interface IHeaderModalProps {
  login: boolean;
  register: boolean;
  forgotPassword: boolean;
}

export interface INotification {
  hasUnreadMessage?: boolean;
  hasUnreadNotification?: boolean;
}

export interface IReduxHeader {
  type: string;
  payload: string;
}

export interface IReduxShowCategory {
  type: string;
  payload: boolean;
}

export interface IHomeHeaderProps {
  authUser?: IAuthUser;
  showCategoryContainer?: boolean;
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>;
}
