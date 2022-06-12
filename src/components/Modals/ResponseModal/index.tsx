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
import { CParam, CWork, CResponse } from 'services/workflow/workmap/worknode/workmodel';

interface ILocalState extends SettingBar.ILocalState{
  fieldName: string;
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
    valuePath: CParam.getParam(data.selectedResponseId)?.getFieldSourceValuePath(),
    fieldName: CParam.getParam(data.selectedResponseId)?.getFieldName(),
    ...data
  });

  const [nodeList, setNodeList] = React.useState(workflow.workmap);
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
        selectedSrcId: CParam.getParam(localState.selectedResponseId ?? "")?.fieldSourceId,
        valuePath: CParam.getParam(localState.selectedResponseId ?? "")?.getFieldSourceValuePath()
      })
    }
  },[localState.selectedResponseId])

  //functions
  const onOk = () => {
    if(!localState.isModalEdit) {
      const work = CWorkflow.getInstance().getNode(localState.nodeId)?.getInstance();
      const param = 
          new CResponse(
              localState.fieldName, 
              "0", 
          );
      param.setSrcValuePath(localState.valuePath);
      work?.addResponse(param.id, param);

    } else {

      CParam.getParam(localState.selectedResponseId ?? "")?.setSrcValuePath(localState.valuePath);
    }
    setStateMany( setLocalState, {showModal: false});    
  };

  const onValuePathChange = (value: string) => {
    setStateMany(setLocalState, {
      valuePath: value
    })
  };

  const onFieldNameChange = (value: string) => {
    setStateMany(setLocalState, {
      fieldName: value
    })
  }

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
        {
          !localState.isModalEdit && 
          <FormControlContainer>
            <MUI.FormControl fullWidth>
                <div className={styles.borderLabel}>{t('workflow.setting.modal.response.newable')}</div>
                <MUI.TextField
                  size={"medium"}
                  InputProps={{ classes: { input: styles.textWrapper } }}
                  id="outlined-size-normal"
                  defaultValue={""}
                  onChange={e => onFieldNameChange(e.target.value) }
                />
            </MUI.FormControl>
          </FormControlContainer>
        }
        <FormControlContainer>
          <MUI.FormControl fullWidth>
              <div className={styles.borderLabel}>{t('workflow.setting.modal.response.path')}</div>
              <MUI.TextField
                size={"medium"}
                InputProps={{ classes: { input: styles.textWrapper } }}
                // label={t('workflow.setting.modal.response.sourcesLabel')}
                id="outlined-size-normal"
                defaultValue={(localState.isModalEdit) ? localState.valuePath: ""}
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
