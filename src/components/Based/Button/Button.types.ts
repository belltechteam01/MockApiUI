import React from 'react';
import { IBaseUIProps } from '../types';

export interface IButtonProps extends IBaseUIProps {
  text?: string;
  loading?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | 'purple';
  isChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loadingIndicator?: string;
  file?: boolean;
  acceptFileTypes?: string[];
  isMulti?: boolean;
  clean?: boolean;
  disableRipple?: boolean;
  stopPropagation?: boolean;
}
