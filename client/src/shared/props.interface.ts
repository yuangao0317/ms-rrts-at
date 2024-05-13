import { ReactNode } from "react";

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