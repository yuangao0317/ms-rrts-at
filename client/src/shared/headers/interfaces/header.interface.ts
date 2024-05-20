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
