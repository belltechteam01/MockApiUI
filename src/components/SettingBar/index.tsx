import * as MUI from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import * as ReactflowRenderer from 'react-flow-renderer';

import * as Types from '../../services/workflow/types';
import { CWorkflow } from 'services/workflow';

// import ApiSetting, { IApiSettingProps } from './ApiSetting';

interface INodeSettingProps {
  nodeId: string;
  isShow: boolean;
  workflow: CWorkflow;
  onClose: Function;
  onSave: Function;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const NodeSetting: React.FC<INodeSettingProps> = (props: INodeSettingProps) => {

  let {
    nodeId,
    workflow,
    isShow,
    onClose,
    onSave
  } = props;

  //props

  //states  
  const [show, setShow] = useState(isShow);

  useEffect(() => {

    setShow(isShow);
  }, [isShow]);

  //events
  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event && event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

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
            {/* apiSelector */}

            {/* parameters editor */}

            {/* response editor */}

            {/* status code editor */}

            {/* button group */}

          </MUI.Box>
        </MUI.SwipeableDrawer>
      </React.Fragment>
    </>
  );
};
export default NodeSetting;
