import React, { useEffect, useState, ReactNode } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { IRequestItem } from 'services/workflow/types';
import { CWorkflow } from 'services/workflow';
import { ModalType, IModalProps } from '../index';

const getEditableCheck = (isCheck: boolean, onCheck: Function, t: Function): ReactNode => {
  let ret: ReactNode;

  ret = (
    <>
      <MUI.FormControlLabel sx={{ mb: 1 }} control={<MUI.Checkbox defaultChecked={isCheck} onChange={(e) => onCheck(e.target.checked)} />} label={t('workflow.setting.modal.request.newable')} />
    </>
  );

  return ret;
};
const getSourceSelector = (selected: IRequestItem | undefined, onSelect: Function, t: Function, isSelectable: boolean = true, data: any): ReactNode => {
  let ret: ReactNode;

  const requests: Array<IRequestItem> = data;
  const requestList = requests.map((request) => {
    return {value: request.id, label: request.path};
  });

  const selectedItem = {value: selected?.id, label: selected?.fieldSourceValuePath};

  ret = (
    <>
      <MUI.FormControl fullWidth variant="standard" sx={{mb :3}}>
        {!isSelectable && (
          <ReactSelect
            id="api-selector"
            aria-describedby="action-helper-text"
            placeholder={t('workflow.setting.modal.request.selectorPlaceholder')}
            defaultValue={selectedItem}
            options={requestList}
            onChange={(e:any) => onSelect(selectedItem.value, e.value)}
            styles={{
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 1001
              }),
              menu: (provided) => ({ ...provided, zIndex: 1001 })
            }}
          />
	      )}
        {isSelectable && (
          <MUI.TextField
            InputProps={{ classes: { input: styles.textWrapper } }}
            id="outlined-size-normal"
            defaultValue=""
          />
        )}
      </MUI.FormControl>
    </>
  );

  return ret;
};

const getPathEditor = (selected: IRequestItem | undefined, onChange: Function, t: Function, data: any, isSelectable: boolean = false): ReactNode => {
  let ret: ReactNode;
  ret = (
    <div className={styles.pathEditor}>
      <MUI.FormControl fullWidth>
        <div className={styles.borderLabel}>{t('workflow.setting.modal.request.path')}</div>
        {isSelectable && (
          <MUI.TextField
            InputProps={{ classes: { input: styles.textWrapper } }}
            id="outlined-size-normal"
            // label={t('workflow.setting.modal.request.valueLabel')}
            placeholder="Request Path"
            defaultValue=""
          />
        )}
        {!isSelectable && (
          <MUI.TextField
            InputProps={{ classes: { input: styles.textWrapper } }}
            // label={t('workflow.setting.modal.request.sourcesLabel')}
            id="outlined-size-normal"
            defaultValue=""
          />
        )}
      </MUI.FormControl>
    </div>
  );
  return ret;
};

export const Modal = (props: IModalProps) => {
  const { id, selectedId, data, onClose } = props;

  //props
  const workflow: CWorkflow = data;
  const isUpdateMode: boolean = selectedId !== "";
  const properties = [];

  let requestAll: Array<IRequestItem> = workflow?.getRequest();
  let requests: Array<IRequestItem> = workflow?.getRequest(selectedId);
  const selected = (isUpdateMode && requests.length > 0) ? requests[0] : undefined;
  
  //states
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  const [source, setSource] = React.useState(0);
  const [isEdit, setEdit] = useState(!isUpdateMode);

  //functions
  const onOk = () => {
    setShowModal(false);
  };

  const onCheck = (bChecked: boolean) => {
    setEdit(bChecked);
  };

  const onSelect = (curId: string, selectedId: string) => {
    
    const requests = workflow.getRequestMap();

    const _cur = requests.get(curId);
    const _selected = requests.get(selectedId);

    if(_cur && _selected) {
      _cur.fieldSourceValuePath = _selected.path ?? "";
      _cur.fieldSourceType = _selected.fieldSourceType;
    }
  };

  const onChange = () => {};

  //useEffect
  useEffect(() => {
    if (!showModal) onClose();
  }, [showModal]);

  const editableCheck = getEditableCheck(!isUpdateMode ,onCheck, t);
  const sourceSelector = getSourceSelector(selected, onSelect, t, isEdit, requestAll);
  const pathEditor = getPathEditor(selected, onChange, t, requestAll);

  return (
    <BasicModal open={showModal} onClose={() => setShowModal(false)} title={'Edit Request Parameters'}>
      {/* body */}
      <div className={styles.modalBody}>
        {/* checkbox - editable */}
        {editableCheck}

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
          <Button variant="outlined" classes={{ root: styles.btnCancel }} onClick={(e: any) => setShowModal(false)} text="Cancel" />
        </div>
      </div>
    </BasicModal>
  );
};
