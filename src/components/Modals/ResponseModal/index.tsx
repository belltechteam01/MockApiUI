import React, { useEffect, useState, ReactNode, useCallback } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, ReactSelect } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { CWorkflow, Workflow } from 'services/workflow';
import { IModalProps } from '../index';
import {setStateMany} from "utils";
import * as SettingBar from "../../SettingBar/pane";
import { height } from '@mui/system';

interface ILocalState extends SettingBar.ILocalState{
  valuePath: string;
}

export const Modal = (props: IModalProps) => {
  const { 
    id, 
    type,
    data,
    onClose 
  } = props;

  //props
  const workflow = CWorkflow.getInstance();
  const [localState, setLocalState] = React.useState<ILocalState>({
    valuePath: workflow.getParam(data.selectedResponseId)?.getFieldSourceValuePath(),
    ...data
  });

  const [nodeList, setNodeList] = React.useState(workflow.worklist);
  console.log("[LOG] response edit modal", workflow);
  console.log("[LOG] response edit modal", localState);
  console.log("[LOG] response edit modal", nodeList);
  
  //states
  const { t } = useTranslation();

  //useEffect
  useEffect(() => {

    if (!localState.showModal) 
      onClose();

  }, [localState.showModal]);

  useEffect(() => {

    if(localState.selectedApiId) {
      setStateMany(setLocalState, {
        selectedSrcId: workflow.getParam(localState.selectedResponseId)?.fieldSourceId,
        valuePath: workflow.getParam(localState.selectedResponseId)?.getFieldSourceValuePath()
      })
    }
  },[localState.selectedResponseId])

  //functions
  const onOk = () => {
    
    workflow.getParam(localState.selectedResponseId)?.setSrcValuePath(localState.valuePath);
    
    setStateMany( setLocalState, {showModal: false});
  };

  const onValuePathChange = (value: string) => {
    setStateMany(setLocalState, {
      valuePath: value
    })
  };

  //useEffect
  useEffect(() => {

    if (!localState.showModal) 
      onClose();

  }, [localState]);

  return (
    <BasicModal 
      open={localState.showModal} 
      onClose={() => setStateMany(setLocalState, {showModal: false})} 
      title={ localState.isModalEdit ? 'Edit Response Parameters' : 'Add Response Parameters'}
    >
      {/* body */}
      <div className={styles.modalBody}>
        <FormControlContainer>
          <MUI.FormControl fullWidth>
              <div className={styles.borderLabel}>{t('workflow.setting.modal.response.path')}</div>
              <MUI.TextField
                size={"medium"}
                InputProps={{ classes: { input: styles.textWrapper } }}
                // label={t('workflow.setting.modal.response.sourcesLabel')}
                id="outlined-size-normal"
                defaultValue={localState.valuePath}
                onChange={e => onValuePathChange(e.target.value) }
              />
          </MUI.FormControl>
        </FormControlContainer>
      </div>
      {/* button group */}
      <div className={styles.btnWrapper}>
        <div className={styles.btnOkWrapper}>
          <Button variant="contained" classes={{ root: styles.btnOk }} onClick={onOk} text="OK" />
        </div>
        <div className={styles.cancelOkWrapper}>
          <Button variant="outlined" classes={{ root: styles.btnCancel }} onClick={(e: any) => setStateMany(setLocalState, {showModal: false})} text="Cancel" />
        </div>
      </div>
    </BasicModal>
  );
};
