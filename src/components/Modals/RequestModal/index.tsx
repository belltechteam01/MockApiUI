import React, { useEffect, useState, ReactNode } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { IRequestItem, IResponseItem, ItemType } from 'services/workflow/types';
import { CWorkflow } from 'services/workflow';
import { ModalType, IModalProps } from '../index';
import {setStateMany} from "utils";
import { CWork } from 'services/workflow/workmodel/models/work';
import { CWorkNode } from 'services/workflow/workmap/worknode';

interface ILocalState {
  modalType: ModalType;
  showModal: boolean;
  isEdit: boolean;
  selectedApiId: string;
}

interface IParam {
  value: string;
  label: string;
}

const getEditableCheck = (isCheck: boolean, onCheck: Function, t: Function): ReactNode => {
  let ret: ReactNode;

  ret = (
    <>
      <MUI.FormControlLabel sx={{ mb: 1 }} control={<MUI.Checkbox defaultChecked={isCheck} onChange={(e) => onCheck(e.target.checked)} />} label={t('workflow.setting.modal.request.newable')} />
    </>
  );

  return ret;
};

const getSrcLabel = (apiName: string | undefined, fieldName: string | undefined, fieldType: ItemType|undefined): string => {
  
  var ret: string = "";

  switch(fieldType){
    case ItemType.REQUEST:
        ret = "From '" + (apiName ?? "untitled") + "'-'" + fieldName + "' REQUEST";
      break;

    case ItemType.RESPONSE:
        ret = "From '" + (apiName ?? "untitled") + "'-'" + fieldName + "' RESPONSE";
      break;

    case ItemType.RULE_INPUT:
        ret = "From '" + (apiName ?? "untitled") + "'-'" + fieldName + "' RULE REQ";
      break;

    case ItemType.RULE_OUTPUT:
        ret = "From '" + (apiName ?? "untitled") + "'-'" + fieldName + "' RULE RESP";
      break;
  }

  return ret;
}

const getSourceSelector = (
  paramsList: any,
  localState:ILocalState,
  setLocalState: Function,
  t: Function
): ReactNode => 
{
  let ret: ReactNode;

  ret = (
    <>
      <MUI.FormControl fullWidth variant="standard" sx={{mb :3}}>
        <ReactSelect
          id="api-selector"
          aria-describedby="action-helper-text"
          placeholder={t('workflow.setting.modal.request.selectorPlaceholder')}
          // defaultValue={selectedItem}
          // options={selectableItems}
          // onChange={(e:any) => onSelect(selectedItem?.value, e.value)}
          styles={{
            menuPortal: (provided) => ({
              ...provided,
              zIndex: 1001
            }),
            menu: (provided) => ({ ...provided, zIndex: 1001 })
          }}
        />
      </MUI.FormControl>
    </>
  );

  return ret;
};

const getPathEditor = (
  keysList: any,
  localState:ILocalState,
  setLocalState: Function,
  t: Function
): ReactNode => 
{
  let ret: ReactNode;
  ret = (
    <div className={styles.pathEditor}>
      <MUI.FormControl fullWidth>
          <div className={styles.borderLabel}>{t('workflow.setting.modal.request.path')}</div>
          <MUI.TextField
            InputProps={{ classes: { input: styles.textWrapper } }}
            // label={t('workflow.setting.modal.request.sourcesLabel')}
            id="outlined-size-normal"
            defaultValue=""
          />
      </MUI.FormControl>
    </div>
  );
  return ret;
};

export const Modal = (props: IModalProps) => {
  const { 
    id, 
    type,
    attribId, 
    data, 
    onClose 
  } = props;

  //props
  const nodeList = CWorkflow.getInstance().worklist.getMap();

  //states
  const { t } = useTranslation();
  const [localState, setLocalState] = React.useState<ILocalState>({
    isEdit : (attribId !== ""),
    modalType: type,
    selectedApiId: "",
    showModal: true,
  });

  const [paramsList, setParamsList] = React.useState<IParam[]>([]);
  const [keysList, setKeysList] = React.useState<string[]>([]);
  
  //functions
  const onOk = () => {
    setStateMany( setLocalState, {showModal: false});
  };

  const onCheck = (bChecked: boolean) => {

  };

  const onSelect = (curId: string, selectedId: string) => {
    
    const requests = CWorkflow.getInstance().getApiList();

    const _cur = requests.get(curId);
    const _selected = requests.get(selectedId);

    if(_cur && _selected) {

    }
  };

  const onChange = () => {};

  //useEffect
  useEffect(() => {

    if (!localState.showModal) 
      onClose();

  }, [localState]);

  useEffect(() => {
    let params: any = [];
    nodeList.forEach((value, key) => {
      const workNode: CWorkNode<CWork> = value;

      params = params.concat({
        value: key,
        label: workNode.getInstance().name
      })
    })

    setParamsList(params);

  }, []);

  useEffect(() => {

  }, [keysList]);

  const sourceSelector = getSourceSelector(paramsList, localState, setLocalState, t);
  const pathEditor = getPathEditor(keysList, localState, setLocalState, t);

  return (
    <BasicModal open={localState.showModal} onClose={() => setStateMany(setLocalState, {showModal: false})} title={'Edit Request Parameters'}>
      {/* body */}
      <div className={styles.modalBody}>
        {/* checkbox - editable */}
        {/* {editableCheck} */}

        {/* request souorce path */}
        {sourceSelector}

        {/* value path */}
        {pathEditor}

        {/* button group */}
      </div>
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
