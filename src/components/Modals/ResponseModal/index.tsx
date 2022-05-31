import React, { useEffect, useState, ReactNode } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { IRequestItem, IResponseItem } from 'services/workflow/types';
import { CWorkflow } from 'services/workflow';
import { ModalType, IModalProps } from '../index';


const getEditableCheck = (onCheck: Function, t: Function): ReactNode => {
  let ret: ReactNode;

  ret = <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked onChange={(e) => onCheck(e.target.checked)} />} label={t('workflow.setting.modal.response.newable')} />;

  return ret;
};

const getSourceSelector = (onSelect: Function, t: Function, isSelectable: boolean = true, data: any): ReactNode => {
  let ret: ReactNode;
  const response: IResponseItem = data;

  ret = (
    <div className={styles.sourceWrapper}>
      <div className={styles.borderLabel}>{t('workflow.setting.modal.response.sourcesLabel')}</div>
      <>
        <MUI.TextField
          InputProps={{ classes: { input: styles.textWrapper } }}
          fullWidth
          // label={t('workflow.setting.modal.response.sourcesLabel')}
          id="outlined-size-normal"
          defaultValue={response.fieldName}
          disabled={true}
        />
      </>
    </div>
  );

  return ret;
};

const getPathEditor = (onChange: Function, t: Function, data: any, isSelectable: boolean = false): ReactNode => {
  let ret: ReactNode;
  ret = (
    <div className={styles.pathWrapper}>
      <div className={styles.borderLabel}>{t('workflow.setting.modal.response.path')}</div>
      <MUI.TextField
        id="outlined-size-normal"
        InputProps={{ classes: { input: styles.textWrapper } }}
        fullWidth
        // label={t('workflow.setting.modal.response.valueLabel')}
        placeholder="Response Path"
        defaultValue=""
        onChange={(e) => onChange(e)}
      />
    </div>
  );
  return ret;
};

export const Modal = (props: IModalProps) => {
  const { id, selectedId, data, onClose } = props;

  //props
  let workflow: CWorkflow = data;
  const isEditMode: boolean = selectedId != "";
  const properties = [];
  let selected: IRequestItem;//workflow.getRequests().get(selectedId);

  
  //states
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  const [source, setSource] = React.useState(20);
  const [isEdit, setEdit] = useState(true);
  // const [path, setPath] = useState(selected?.fieldSourceValuePath);
  //functions
  const onOk = () => {
    const requests = workflow.getApiList();
    const _selected = requests.get(selectedId);
    if(_selected) {
      // _selected.fieldSourceValuePath = path ?? "";
    }

    setShowModal(false);
  };

  const onCheck = (bChecked: boolean) => {
    setEdit(bChecked);
  };

  const onSelect = () => {};

  const onChange = (e) => {
    // setPath(e.target.value);
  };

  //useEffect
  useEffect(() => {
    if (!showModal) onClose();
  }, [showModal]);

  const editableCheck = getEditableCheck(onCheck, t);
  // const sourceSelector = getSourceSelector(onSelect, t, isEdit, selected);
  // const pathEditor = getPathEditor(onChange, t, selected);

  return (
    <BasicModal open={showModal} title={'Edit Response Parameters'} onClose={() => setShowModal(false)}>
      {/* body */}
      <div className={styles.successWrapper}>
        {/* checkbox - editable */}
        {/* {editableCheck} */}

        {/* Response souorce path */}
        {/* {sourceSelector} */}

        {/* value path */}
        {/* {pathEditor} */}
      </div>

      {/* button group */}
      <div className={styles.btnWrapper}>
        <div className={styles.btnOkWrapper}>
          <Button variant="outlined" classes={{ root: styles.btnOk }} onClick={onOk} text="OK" />
        </div>
        <div className={styles.btnCancelWrapper}>
          <Button variant="outlined" classes={{ root: styles.btnCancel }} onClick={(e: any) => setShowModal(false)} text="Cancel" />
        </div>
      </div>
    </BasicModal>
  );
};
