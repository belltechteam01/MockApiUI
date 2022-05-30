import React, { useEffect, useState, ReactNode } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { IRequestItem } from 'services/workflow/types';
import { CWorkflow } from 'services/workflow';
import { ModalType } from '../index';

interface IModalProps {
  id: string;
  selectedRow: ModalType;
  data: any;
  onClose: Function;
}

const getEditableCheck = (onCheck: Function, t: Function): ReactNode => {
  let ret: ReactNode;

  ret = (
    <>
      <MUI.FormControlLabel sx={{ mb: 1 }} control={<MUI.Checkbox defaultChecked onChange={(e) => onCheck(e.target.checked)} />} label={t('workflow.setting.modal.request.newable')} />
    </>
  );

  return ret;
};

const getSourceSelector = (onSelect: Function, t: Function, isSelectable: boolean = true, data: any): ReactNode => {
  let ret: ReactNode;
  ret = (
    <div className={styles.sourceWrapper}>
      <MUI.FormControl fullWidth>
        <div className={styles.borderLabel}>{t('workflow.setting.modal.request.sourcesLabel')}</div>
        {!isSelectable && (
          <MUI.Select
            classes={{ select: styles.selectRoot }}
            value={10}
            // label=""
            onChange={() => ({})}
          >
            <MUI.MenuItem value={10}>Ten</MUI.MenuItem>
            <MUI.MenuItem value={20}>Twenty</MUI.MenuItem>
            <MUI.MenuItem value={30}>Thirty</MUI.MenuItem>
          </MUI.Select>
        )}
        {isSelectable && (
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

const getPathEditor = (onChange: Function, t: Function, data: any, isSelectable: boolean = false): ReactNode => {
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
  const { id, selectedRow, data, onClose } = props;

  //props
  const workflow: CWorkflow = data;
  const isEditMode: boolean = selectedRow >= 0;
  const properties = [];

  //states
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  const [source, setSource] = React.useState(20);
  const [isEdit, setEdit] = useState(true);

  //functions
  const onOk = () => {
    setShowModal(false);
  };

  const onCheck = (bChecked: boolean) => {
    setEdit(bChecked);
  };

  const onSelect = () => {};

  const onChange = () => {};

  //useEffect
  useEffect(() => {
    if (!showModal) onClose();
  }, [showModal]);

  const editableCheck = getEditableCheck(onCheck, t);
  const sourceSelector = getSourceSelector(onSelect, t, isEdit, {});
  const pathEditor = getPathEditor(onChange, t, {});

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
