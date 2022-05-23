import { fType, IBaseUIProps } from '../types';

export interface IModalProps extends IBaseUIProps {
  title?: string;
  text?: string;
  open: boolean;
  onClose: fType;
  requesting?: boolean;
  isAcceptable?: boolean;
  acceptButtonText?: string;
  onAccept?: fType;
  isCancelable?: boolean;
  cancelbuttonText?: string;
  onCancel?: fType;
  size?: 'small' | 'medium' | 'large' | 'fullScreen';
  isLock?: boolean;
  hideCloseIcon?: boolean;
}
