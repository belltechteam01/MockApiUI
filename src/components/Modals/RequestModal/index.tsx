import React, { useEffect, useState, ReactNode, useCallback } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, ReactSelect } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { CWorkflow } from 'services/workflow';
import { IModalProps } from '../index';
import {setStateMany} from "utils";
import * as SettingBar from "../../SettingBar/pane";
import { CParam, ParamSrcType } from 'services/workflow/workmap/worknode/workmodel';

interface ILocalState extends SettingBar.ILocalState{
  valuePath: string;
  selectedSrcId: string;
}

const getSrcLabel = (isInputData: boolean, srcId: string, nodeName: string): any => {
  
  if(isInputData)
    return {value: srcId, label: "INPUT FROM REQUEST"};
  else
    return {value: srcId, label: 'FROM "' + nodeName + "' RESPONSE"};
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
    selectedSrcId: CParam.getParam(data.selectedRequestId)?.fieldSourceId,
    valuePath: CParam.getParam(data.selectedRequestId)?.getFieldSourceValuePath(),
    ...data
  });

  const [nodeList, setNodeList] = React.useState(workflow.workmap);
  
  //states
  const { t } = useTranslation();

  let nodeList_ui:any;
  let selectedSrc = {value:"", label:""};

  if(nodeList) {
      
    console.log("[LOG] nodeId", localState.nodeId);
    console.log("[LOG] srcId", localState.selectedSrcId);

    nodeList_ui = nodeList.toArray().map(value => {      
      if(value.id == localState.selectedSrcId)
        selectedSrc = getSrcLabel(value.id == localState.nodeId, value.id, value.getName());
      return getSrcLabel(value.id == localState.nodeId, value.id, value.getName());
    });
  }

  const [selectedOption, setSelectedOption] = useState(selectedSrc);
  const [srcOptions, setSrcOptions] = useState(nodeList_ui ?? []);

  //useEffect
  useEffect(() => {

    if (!localState.showModal) 
      onClose();

  }, [localState.showModal]);

  useEffect(() => {

    if(localState.selectedApiId) {
      setStateMany(setLocalState, {
        selectedSrcId: CParam.getParam(localState.selectedRequestId ?? "")?.fieldSourceId,
        valuePath: CParam.getParam(localState.selectedRequestId ?? "")?.getFieldSourceValuePath()
      })
    }
  },[localState.selectedRequestId])

  //functions
  const onOk = () => {
    const param = CParam.getParam(localState.selectedRequestId ?? "");

    if(param) {
      param.setSrcValuePath(localState.valuePath);
      // param.setFieldSourceId(selectedOption?.value);

      param.setFieldSrcType(
        (localState.nodeId == selectedOption?.value) ? 
        ParamSrcType.INPUTDATA:
        ParamSrcType.API
      );
      setStateMany(setStateMany, {selectedSrcId: selectedOption?.value ?? ""})
    }
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
      title={ localState.isModalEdit ? 'Edit Request Parameters' : 'Add Request Parameters'}
    >
      {/* body */}
      <div className={styles.modalBody}>
        <FormControlContainer>
          <MUI.FormControl fullWidth variant="standard">
            <div className={styles.borderLabel}>{t('workflow.setting.modal.request.path')}</div>
            <ReactSelect
              id="api-selector"
              aria-describedby="action-helper-text"
              placeholder={t('workflow.setting.form.placeholder.api-selector')}
              value={selectedOption}
              options={srcOptions}
              onChange={(e: any) => {
                setSelectedOption(e);
              }}
            />
          </MUI.FormControl>
        </FormControlContainer>
        <FormControlContainer>
          <MUI.FormControl fullWidth>
              <div className={styles.borderLabel}>{t('workflow.setting.modal.request.path')}</div>
              <MUI.TextField
                size={"medium"}
                InputProps={{ classes: { input: styles.textWrapper } }}
                // label={t('workflow.setting.modal.request.sourcesLabel')}
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
