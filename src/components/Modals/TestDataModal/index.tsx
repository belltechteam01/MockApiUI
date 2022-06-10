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
import { JsonEditor } from 'components/Based/JsonEditor';

interface ILocalState extends SettingBar.ILocalState{
  jsonData: string;
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
    jsonData: workflow.getNode(data.nodeId)?.getJsonData(),
    ...data
  });

  const [nodeList, setNodeList] = React.useState(workflow.workmap);
 
  //states
  const { t } = useTranslation();

  //useEffect
  useEffect(() => {

    if (!localState.showModal) 
      onClose();

  }, [localState.showModal]);

  //functions
  const onOk = () => {
    
    workflow.getNode(localState.nodeId)?.setJsonData(localState.jsonData);
    
    console.log("[LOG] json data", workflow.getNode(localState.nodeId));

    setStateMany( setLocalState, {showModal: false});
  };

  const onDataChange = (value: string) => {
    setStateMany(setLocalState, {
      jsonData: value
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
      title={'Input Json data'}
    >
      {/* body */}
      <div className={styles.modalBody}>
        <FormControlContainer>
              {/* <div className={styles.borderLabel}>{t('workflow.setting.modal.jsondata.label')}</div> */}
              {/* <MUI.TextField
                size={"medium"}
                InputProps={{ classes: { input: styles.textWrapper } }}
                // label={t('workflow.setting.modal.response.sourcesLabel')}
                id="outlined-size-normal"
                defaultValue={localState.jsonData}
                onChange={e => onDataChange(e.target.value) }
              /> */}

              <JsonEditor
                height={50}
                width="100%"
                defaultValue={localState.jsonData}
                onChange={(value, event) => onDataChange(value ?? "")}
              />
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
