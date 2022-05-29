import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import cn from 'classnames';
import { IBasicModalProps } from '../types';
import styles from './styles.module.scss';

export default function BasicModal(props: IBasicModalProps) {
  const { 
    open, 
    onClose, 
    children, 
    title, 
    classes: {
        container, 
        titleWrapper,
        bodyWrapper 
    } = {} 
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div className={cn(styles.root, container)}>
        {title && <div className={cn(styles.header, titleWrapper)}>{title}</div>}
        <div className={cn(styles.body, bodyWrapper)}>{children}</div>
      </div>
    </Modal>
  );
}
