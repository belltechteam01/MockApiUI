import React, { useEffect, useRef, useState } from 'react';

import { styled } from '@mui/material/styles';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import styles from './styles.module.scss';

const TreeItemRoot = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: '0px 0px',
    '&.Mui-expanded': {
      backgroundColor: styles.highlightBackgroundColorSecondary
    },
    '&:hover': {
      backgroundColor: styles.highlightBackgroundColorSecondary
    },
    '&.Mui-selected': {
      backgroundColor: styles.highlightBackgroundColorSecondary
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: styles.highlightBackgroundColorSecondary
    }
  }
}));

const LightTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}));

const Input = styled('input')((props: any) => ({
  border: 'none',
  background: '#fff',
  boxSizing: 'border-box',
  width: '100%',
  height: 20,
  fontSize: 12,
  marginTop: 4,
  padding: '0px 6px',
  '&:focus': {
    border: '1px solid #EAEAEA'
  }
}));

export interface BaseTreeItemProps extends TreeItemProps {}

export const BaseTreeItem = (props: BaseTreeItemProps) => {
  const { label, ...other } = props;
  return (
    <TreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Typography className={styles.label} variant="body2" sx={{ fontWeight: 'inherit', width: '100%', flowGrow: 1 }}>
            {label}
          </Typography>
          <LightTooltip title="View more actions" placement="bottom-start">
            <button className={styles.actionButton} onClick={() => viewMoreActions('COLLECTION')}>
              <i title="">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 8C1 6.89543 1.89543 6 3 6C4.10457 6 5 6.89543 5 8C5 9.10457 4.10457 10 3 10C1.89543 10 1 9.10457 1 8ZM3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7Z"
                    fill="#6B6B6B"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
                    fill="#6B6B6B"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 6C11.8954 6 11 6.89543 11 8C11 9.10457 11.8954 10 13 10C14.1046 10 15 9.10457 15 8C15 6.89543 14.1046 6 13 6ZM12 8C12 7.44772 12.4477 7 13 7C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9C12.4477 9 12 8.55228 12 8Z"
                    fill="#6B6B6B"
                  ></path>
                </svg>
              </i>
            </button>
          </LightTooltip>
        </Box>
      }
      {...other}
      classes={{ root: styles.item }}
    />
  );
};

export interface MenuItemProps {
  id: number;
  name: string;
}

export interface IconTreeItemProps extends TreeItemProps {
  iconType?: string;
  menus?: Array<MenuItemProps>;
  name: string;
  readOnly?: boolean;
  isLoading?: boolean;
  onRename?: (nodeIds: string, value: string) => void;
  onChangeSelected?: (nodeIds: string) => void;
  onMenuClick?: (nodeIds: string, menuName: string) => void;
}

export const IconTreeItem = (props: IconTreeItemProps) => {
  const { isLoading = false, name, nodeId, iconType, children, menus, onRename, onChangeSelected, onMenuClick, ...other } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [nodeName, setNodeName] = useState<string>(name || '');
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [loadingId, setLoadingId] = useState<string>('');

  useEffect(() => {
    if (!isLoading) setLoadingId('');
  }, [isLoading]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
    event.stopPropagation();
    setAnchorEl(null);
    console.log('[LOG] click menu(' + nodeId + ')', menuName);
    setLoadingId(nodeId);
    if (menuName === 'Rename') {
      setReadOnly(true);
      if (onChangeSelected) onChangeSelected(nodeId);
      console.log('inputRef===>', inputRef);
      if (inputRef) inputRef.current?.focus();
      return;
    } else if (onMenuClick) {
      onMenuClick(nodeId, menuName);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setReadOnly(false);
    setLoadingId(nodeId);
    if (onRename) onRename(nodeId, nodeName || '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNodeName(e.target.value);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setReadOnly(false);
      setLoadingId(nodeId);
      if (onRename) onRename(nodeId, nodeName || '');
    }
  };

  const menuItems = menus?.map((menu) => (
    <MenuItem key={menu.id} onClick={(event: React.MouseEvent<HTMLElement>) => handleMenuClick(event, menu.name)}>
      <Typography className={styles.label}>{menu.name}</Typography>
    </MenuItem>
  ));

  return (
    <TreeItemRoot
      nodeId={nodeId}
      classes={{ root: styles.item }}
      children={children}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          {iconType === 'FOLDER' && (
            <i className={styles.iconFolder} title="">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 1C1.67157 1 1 1.67157 1 2.5V13.5C1 14.3284 1.67157 15 2.5 15H13.5C14.3284 15 15 14.3284 15 13.5V4.5C15 3.67157 14.3284 3 13.5 3H8.70711L7.14645 1.43934C6.86514 1.15803 6.48361 1 6.08579 1H2.5ZM2 2.5C2 2.22386 2.22386 2 2.5 2H6.08579C6.21839 2 6.34557 2.05268 6.43934 2.14645L8.14645 3.85355C8.24021 3.94732 8.36739 4 8.5 4H13.5C13.7761 4 14 4.22386 14 4.5V6H2V2.5ZM2 7V13.5C2 13.7761 2.22386 14 2.5 14H13.5C13.7761 14 14 13.7761 14 13.5V7H2Z"
                  fill="#6B6B6B"
                ></path>
              </svg>
            </i>
          )}
          {iconType === 'REQUEST__GET' && <div className={[styles.iconMethod, styles.colorGreen].join(' ')}>GET</div>}
          {iconType === 'REQUEST__POST' && <div className={[styles.iconMethod, styles.colorOrange].join(' ')}>POST</div>}
          {iconType === 'REQUEST__PUT' && <div className={[styles.iconMethod, styles.colorBlue].join(' ')}>PUT</div>}
          {iconType === 'REQUEST__PATCH' && <div className={[styles.iconMethod, styles.colorGray].join(' ')}>PATCH</div>}
          {iconType === 'REQUEST__DEL' && <div className={[styles.iconMethod, styles.colorOrangred].join(' ')}>DEL</div>}
          {iconType === 'EXAMPLE' && (
            <i color="content-color-secondary" className={styles.iconExample} title="">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.87192 9.72303C4.65304 9.77086 4.38605 9.79477 4.07096 9.79477C3.42152 9.79477 2.91401 9.61206 2.54841 9.24664C2.1828 8.88122 2 8.36375 2 7.69422C2 7.00507 2.16897 6.47227 2.50692 6.09581C2.84486 5.71935 3.31208 5.53113 3.9086 5.53113C4.47866 5.53113 4.92243 5.69667 5.23993 6.02776C5.55743 6.35884 5.71618 6.81623 5.71618 7.39992V7.94437H3.11485C3.12688 8.2632 3.21948 8.51212 3.39266 8.69115C3.56585 8.87018 3.80878 8.9597 4.12147 8.9597C4.3644 8.9597 4.59411 8.93395 4.81058 8.88245C5.02706 8.83094 5.25316 8.74879 5.48888 8.63597V9.50415C5.29645 9.60225 5.0908 9.67521 4.87192 9.72303ZM4.47144 6.55565C4.33433 6.40482 4.14913 6.32941 3.91581 6.32941C3.6825 6.32941 3.4997 6.40482 3.36741 6.55565C3.23512 6.70648 3.15935 6.92046 3.14011 7.19759H4.68431C4.67949 6.92046 4.60854 6.70648 4.47144 6.55565Z"
                  fill="#6B6B6B"
                ></path>
                <path
                  d="M6.62177 9.65682C6.51112 9.54768 6.4558 9.39379 6.4558 9.19514C6.4558 8.98913 6.50992 8.8334 6.61816 8.72794C6.7264 8.62248 6.88394 8.56975 7.0908 8.56975C7.29044 8.56975 7.44498 8.62371 7.55442 8.73162C7.66386 8.83953 7.71858 8.99403 7.71858 9.19514C7.71858 9.38888 7.66326 9.54155 7.55262 9.65314C7.44197 9.76473 7.28803 9.82052 7.0908 9.82052C6.88875 9.82052 6.73241 9.76595 6.62177 9.65682Z"
                  fill="#6B6B6B"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.05712 9.41218L9.05458 9.41107C8.9426 9.36193 8.84483 9.28198 8.76127 9.17123C8.67709 9.05964 8.635 8.94131 8.635 8.81623C8.635 8.65927 8.67949 8.52868 8.76849 8.42444C8.85749 8.32021 8.98617 8.21782 9.15454 8.11727C8.94287 8.02408 8.77511 7.87448 8.65123 7.66847C8.52736 7.46246 8.46542 7.21966 8.46542 6.94008C8.46542 6.49127 8.60854 6.14425 8.89477 5.899C9.181 5.65375 9.5899 5.53113 10.1215 5.53113C10.2345 5.53113 10.3686 5.54155 10.5238 5.5624C10.6789 5.58324 10.7781 5.59857 10.8214 5.60838H12.2285V6.17858L11.5971 6.34413C11.7126 6.52806 11.7703 6.73407 11.7703 6.96215C11.7703 7.4036 11.6194 7.74756 11.3175 7.99403C11.0156 8.24051 10.5965 8.36375 10.0601 8.36375L9.8617 8.35271L9.69934 8.33432C9.58629 8.42261 9.52977 8.5207 9.52977 8.62861C9.52977 8.79048 9.73181 8.87141 10.1359 8.87141H10.8214C11.264 8.87141 11.6013 8.96828 11.8334 9.16203C12.0655 9.35578 12.1816 9.64026 12.1816 10.0155C12.1816 10.4962 11.985 10.869 11.5917 11.1338C11.1984 11.3987 10.6338 11.5311 9.89777 11.5311C9.33493 11.5311 8.90499 11.4312 8.60794 11.2313C8.31088 11.0314 8.16236 10.7512 8.16236 10.3907C8.16236 10.143 8.23812 9.93579 8.38966 9.76902C8.54119 9.60225 8.76368 9.48331 9.05712 9.41218ZM9.3187 9.91801C9.1828 10.0149 9.11485 10.143 9.11485 10.3024C9.11485 10.4569 9.18761 10.5783 9.33313 10.6666C9.47865 10.7549 9.6825 10.7991 9.94468 10.7991C10.3391 10.7991 10.6482 10.7439 10.8719 10.6335C11.0956 10.5232 11.2075 10.3723 11.2075 10.181C11.2075 10.0265 11.1413 9.91985 11.009 9.86099C10.8767 9.80213 10.6723 9.7727 10.3957 9.7727H9.82562C9.62357 9.7727 9.4546 9.82113 9.3187 9.91801ZM10.1215 6.21169C9.71738 6.21169 9.51533 6.45939 9.51533 6.95479C9.51533 7.17797 9.56524 7.35455 9.66506 7.48453C9.76488 7.61451 9.91702 7.6795 10.1215 7.6795C10.3283 7.6795 10.4799 7.61451 10.5761 7.48453C10.6723 7.35455 10.7204 7.17797 10.7204 6.95479C10.7204 6.45939 10.5207 6.21169 10.1215 6.21169Z"
                  fill="#6B6B6B"
                ></path>
                <path
                  d="M12.9032 9.65682C12.7925 9.54768 12.7372 9.39379 12.7372 9.19514C12.7372 8.98913 12.7913 8.8334 12.8996 8.72794C13.0078 8.62248 13.1654 8.56975 13.3722 8.56975C13.5719 8.56975 13.7264 8.62371 13.8358 8.73162C13.9453 8.83953 14 8.99403 14 9.19514C14 9.38888 13.9447 9.54155 13.834 9.65314C13.7234 9.76473 13.5695 9.82052 13.3722 9.82052C13.1702 9.82052 13.0138 9.76595 12.9032 9.65682Z"
                  fill="#6B6B6B"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 3C0 2.44772 0.447715 2 1 2H15C15.5523 2 16 2.44772 16 3V13C16 13.5523 15.5523 14 15 14H1C0.447715 14 0 13.5523 0 13V3ZM1 3H15V13H1V3Z"
                  fill="#6B6B6B"
                ></path>
              </svg>
            </i>
          )}
          {!readOnly && (
            <Typography className={styles.label} variant="body2" sx={{ fontWeight: 'inherit', width: '100%', flowGrow: 1 }}>
              {nodeName}
            </Typography>
          )}
          {readOnly && (
            <Input
              // autoFocus
              ref={inputRef}
              defaultValue={nodeName}
              readOnly={false}
              onBlur={(e) => handleInputBlur(e)}
              onChange={(e) => handleChange(e)}
              onKeyUp={(e) => handleKeyUp(e)}
            />
          )}

          {menus?.length && (
            <Box>
              <LightTooltip title="View more actions" placement="right-start">
                <button
                  className={styles.actionButton}
                  id="fade-button"
                  // aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {nodeId !== loadingId && (
                    <i title="">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1 8C1 6.89543 1.89543 6 3 6C4.10457 6 5 6.89543 5 8C5 9.10457 4.10457 10 3 10C1.89543 10 1 9.10457 1 8ZM3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7Z"
                          fill="#6B6B6B"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
                          fill="#6B6B6B"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6C11.8954 6 11 6.89543 11 8C11 9.10457 11.8954 10 13 10C14.1046 10 15 9.10457 15 8C15 6.89543 14.1046 6 13 6ZM12 8C12 7.44772 12.4477 7 13 7C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9C12.4477 9 12 8.55228 12 8Z"
                          fill="#6B6B6B"
                        ></path>
                      </svg>
                    </i>
                  )}
                  {isLoading && nodeId === loadingId && (
                    <div className={styles.spinner}>
                      <div className={styles.spinnerItem}></div>
                      <div className={styles.spinnerItem}></div>
                      <div className={styles.spinnerItem}></div>
                      <div className={styles.spinnerItem}></div>
                      <div className={styles.spinnerItem}></div>
                    </div>
                  )}
                </button>
              </LightTooltip>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {menuItems}
              </Menu>
            </Box>
          )}
        </Box>
      }
      // onSelect={(e) => handleTreeSelect(e)}
      {...other}
    />
  );
};
function viewMoreActions(iconType: string) {
  console.log('button clicked');
}
