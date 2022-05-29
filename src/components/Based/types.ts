import { ReactNode } from 'react';

export interface IBasicModalProps extends IBaseUIProps {
  title?: string;
  text?: string;
  open: boolean;
  onClose: Function;
  requesting?: boolean;
  isAcceptable?: boolean;
  acceptButtonText?: string;
  onAccept?: Function;
  isCancelable?: boolean;
  cancelbuttonText?: string;
  onCancel?: Function;
  size?: 'small' | 'medium' | 'large' | 'fullScreen';
  isLock?: boolean;
  hideCloseIcon?: boolean;

  children?: ReactNode;
}

export declare type fType = (...args: any) => void;

export interface IBaseUIProps {
  classes?: any;
  onClick?: fType;
  disabled?: boolean;
  onChange?: fType;
  children?: ReactNode;
}
