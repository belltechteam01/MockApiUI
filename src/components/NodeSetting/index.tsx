/* eslint-disable react/jsx-props-no-spreading */
import * as MUI from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Node } from 'react-flow-renderer';
// import useGetApis from '../../hooks/useGetApis';
// import useAddStep from './../../hooks/useAddStep';
// import useTestStep from '../../hooks/useTestStep';
import ApiSetting, { IApiSettingProps } from './ApiSetting';
import RuleSetting from './RuleSetting';
import CheckSetting from './CheckSetting';
import styles from './styles.module.scss';
import * as Types from '../../services/workflow/types';
import { CWorkflow } from 'services/workflow';

interface INodeSettingProps extends IApiSettingProps {
  
  nodeId: string;
  isShow: boolean;
  workflow: CWorkflow;
  onClose: Function;
}
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const NodeSetting: React.FC<INodeSettingProps> = (props: INodeSettingProps) => {

  let {
    nodeId,
    workflow,
    isShow,
    onClose
  } = props;

  const [show, setShow] = useState(isShow);
  useEffect(() => {
    setShow(isShow);
    console.log("[LOG] change state", isShow);
  }, [isShow]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      
      console.log("toggle drawer", open);
      setShow(open);
      onClose();
  };

  return (
    <>
     <React.Fragment key={'right'}>
        <MUI.SwipeableDrawer
          anchor={'right'}
          open={show}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
        >
          <MUI.Box sx={{ width: 450 }} role="presentation">
            <RuleSetting />
          </MUI.Box>
          {/* {list(anchor)} */}
        </MUI.SwipeableDrawer>
      </React.Fragment>
    </>
  );
};
export default NodeSetting;
