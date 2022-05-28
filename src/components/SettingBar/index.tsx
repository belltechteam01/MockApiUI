import * as MUI from '@mui/material';
import React, {
    useEffect, 
    useRef, 
    useState,
    useCallback,
    ReactNode
} from "react";
import { useTranslation } from 'react-i18next';
import * as Styled from '../../styled';

import * as ReactflowRenderer from 'react-flow-renderer';

import styles from './styles.module.scss';

import * as Types from '../../services/workflow/types';
import { CWorkflow, Workflow } from 'services/workflow';
import { CWorkNode as WorkNode} from "services/workflow/workmap/worknode";
import { CWork } from "services/workflow/workmodel/models/work";
import SettingPane from "./pane";

// import ApiSetting, { IApiSettingProps } from './ApiSetting';
interface ISettingBarProps {
  nodeId: string;
  isShow: boolean;
  workflow: CWorkflow;
  onClose: Function;
  onSave: Function;
}

//functions
const getApiSelector = (workNode: WorkNode<CWork> | null, t: Function): ReactNode => {
  var ret: ReactNode;
  if(workNode) {

    const workData = workNode.getInstance();
    ret = <>
      <Styled.FormControlContainer>
        <MUI.FormControl fullWidth>
          <Styled.Label htmlFor="name">{t('workflow.setting.form.label.name')}</Styled.Label>
          <Styled.Input
            id="name"
            aria-describedby="stepName-helper-text"
            placeholder={t('workflow.setting.form.placeholder.name')}
            value={workData.name}
          />
        </MUI.FormControl>
      </Styled.FormControlContainer>
    </>
  }
  return ret;
}

const SettingBar: React.FC<ISettingBarProps> = (props: ISettingBarProps) => {
  //constants
  const { t } = useTranslation();

  let {
    nodeId,
    workflow,
    isShow,
    onClose,
    onSave
  } = props;

  //props
  const workNode = workflow.worklist.get(nodeId);
  const workData = workNode?.getInstance();

  //states  
  const [show, setShow] = useState(isShow);

  useEffect(() => {

    setShow(isShow);
  }, [isShow]);

  //events
  const toggleDrawer = (open: boolean) =>
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
    <div className={styles.root}>
      <React.Fragment>
        <MUI.SwipeableDrawer
          anchor={'right'}
          open={show}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <MUI.Box className={styles.subContainer} role="presentation">
            <SettingPane nodeId={nodeId} workflow={workflow} />
          </MUI.Box>
        </MUI.SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
export default SettingBar;
