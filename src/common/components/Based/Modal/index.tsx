import * as React from "react";
import classNames from "classnames";

import MuiModal from "@mui/material/Modal";
import Button from "../Button";
import { IModalProps } from "./Modal.types";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles.module.scss";

const Modal = (props: IModalProps) => {
  const {
    title,
    text,
    open,
    onClose,
    requesting = false,
    isAcceptable = true,
    acceptButtonText,
    onAccept,
    isCancelable = false,
    cancelbuttonText,
    onCancel,
    children,
    size = "small",
    isLock = true,
    hideCloseIcon = false,
    classes: {
      root,
      container,
      header,
      textProps,
      footer,
      cancelBtnWrapper,
      cancelBtn,
      acceptBtnWrapper,
      acceptBtn,
    } = {},
  } = props;

  const handleClose = () => {
    if (!isLock) onClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      classes={{ root: classNames(styles.root, root) }}
    >
      <div
        className={classNames(styles.container, container, {
          [styles.small]: size === "small",
          [styles.medium]: size === "medium",
          [styles.large]: size === "large",
          [styles.fullScreen]: size === "fullScreen",
        })}
      >
        {(!hideCloseIcon || title) && (
          <div className={classNames(styles.header, header)}>
            {title && <h6>{title}</h6>}
            {!hideCloseIcon && (
              <div className={styles.closeBtnWrapper}>
                <Button
                  classes={{ root: styles.btnClose }}
                  clean
                  icon={<CloseIcon />}
                  onClick={onClose}
                />
              </div>
            )}
          </div>
        )}

        {text && (
          <div className={classNames(styles.text, textProps)}>{text}</div>
        )}

        {children}

        {(isCancelable || isAcceptable) && (
          <div className={classNames(styles.footer, footer)}>
            {isCancelable && (
              <div
                className={classNames(
                  styles.cancelBtnWrapper,
                  cancelBtnWrapper
                )}
              >
                <Button
                  text={cancelbuttonText || "Cancel"}
                  onClick={onCancel}
                  disabled={requesting}
                  variant="outlined"
                  classes={{
                    root: classNames(styles.cancelBtn, cancelBtn),
                  }}
                />
              </div>
            )}
            {isAcceptable && (
              <div
                className={classNames(
                  styles.acceptBtnWrapper,
                  acceptBtnWrapper
                )}
              >
                <Button
                  text={acceptButtonText || "Ok"}
                  onClick={onAccept}
                  loading={requesting}
                  variant="text"
                  classes={{
                    root: classNames(styles.acceptBtn, acceptBtn),
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </MuiModal>
  );
};

export default Modal;
