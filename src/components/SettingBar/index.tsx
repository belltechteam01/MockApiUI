import * as MUI from '@mui/material';
import React, { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import * as Styled from '../../styled';
import * as ReactflowRenderer from 'react-flow-renderer';

import styles from './styles.module.scss';
import { CWorkflow, Workflow } from 'services/workflow';
import SettingPane from './pane';

// import ApiSetting, { IApiSettingProps } from './ApiSetting';
interface ISettingBarProps {
  nodeId: string;
  isShow: boolean;
  workflow: CWorkflow | undefined;
  onClose: Function;
  onSave: Function;
}

const SettingBar: React.FC<ISettingBarProps> = (props: ISettingBarProps) => {
  //constants
  const { t } = useTranslation();

  let { 
    nodeId, 
    workflow, 
    isShow,
    onClose, 
    ...others 
  } = props;

  //states
  const [show, setShow] = useState(isShow);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  //events
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setShow(open);
    onClose();
  };

  return (
    <div className={styles.root}>
      <React.Fragment>
        <MUI.SwipeableDrawer anchor={'right'} sx={{ width: 450 }} open={show} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <MUI.Box className={styles.subContainer} role="presentation">
            <SettingPane nodeId={nodeId} {...others} />
          </MUI.Box>
        </MUI.SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
export default SettingBar;
