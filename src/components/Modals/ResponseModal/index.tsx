import React, { useEffect, useState, ReactNode } from 'react';
import * as MUI from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import { IResponseItem } from 'services/workflow/types';
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

  ret = <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked onChange={(e) => onCheck(e.target.checked)} />} label={t('workflow.setting.modal.response.newable')} />;

  return ret;
};

const getSourceSelector = (onSelect: Function, t: Function, isSelectable: boolean = true, data: any): ReactNode => {
  let ret: ReactNode;
  ret = (
    <div className={styles.sourceWrapper}>
      <div className={styles.borderLabel}>{t('workflow.setting.modal.response.sourcesLabel')}</div>
      {!isSelectable && (
        <MUI.Select
          classes={{ select: styles.selectRoot }}
          fullWidth
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
        <>
          <MUI.TextField
            InputProps={{ classes: { input: styles.textWrapper } }}
            fullWidth
            // label={t('workflow.setting.modal.response.sourcesLabel')}
            id="outlined-size-normal"
            defaultValue=""
          />
        </>
      )}
    </div>
  );

  return ret;
};

const getPathEditor = (onChange: Function, t: Function, data: any, isSelectable: boolean = false): ReactNode => {
  let ret: ReactNode;
  ret = (
    <div className={styles.pathWrapper}>
      <div className={styles.borderLabel}>{t('workflow.setting.modal.response.path')}</div>
      {isSelectable && (
        <MUI.TextField
          id="outlined-size-normal"
          InputProps={{ classes: { input: styles.textWrapper } }}
          fullWidth
          // label={t('workflow.setting.modal.response.valueLabel')}
          placeholder="Response Path"
          defaultValue=""
        />
      )}
      {!isSelectable && (
        <MUI.TextField
          InputProps={{ classes: { input: styles.textWrapper } }}
          fullWidth
          // label={t('workflow.setting.modal.response.sourcesLabel')}
          id="outlined-size-normal"
          defaultValue=""
        />
      )}
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
    <BasicModal open={showModal} title={'Edit Response Parameters'} onClose={() => setShowModal(false)}>
      {/* body */}
      <div className={styles.successWrapper}>
        {/* checkbox - editable */}
        {editableCheck}

        {/* Response souorce path */}
        {sourceSelector}

        {/* value path */}
        {pathEditor}
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
