import { CSSProperties, ChangeEvent, Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

export interface IButtonProps {
  label?: string | ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  className?: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event?: any) => void;
  disabled?: boolean;
  testId?: string;
}

export interface ITextInputProps {
  id?: string;
  name?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  readOnly?: boolean;
  checked?: boolean;
  rows?: number;
  autoFocus?: boolean;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  onChange?: (event: ChangeEvent) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Modals
export interface IModalContainerProps {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  onTogglePassword?: Dispatch<SetStateAction<boolean>>;
}

// Alerts
export interface IAlertProps {
  type: string;
  message: string;
}

export interface IAlertTypes {
  [key: string]: string;
  success: string;
  error: string;
  warning: string;
}