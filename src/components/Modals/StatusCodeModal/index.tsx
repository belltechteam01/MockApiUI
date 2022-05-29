import React, { useEffect, useState } from 'react';
import { Box, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import {ModalType} from '../index';

interface IModalProps {
  id: string;
  selectedRow: ModalType;
  data: any,
  onClose: Function
}

interface ICode {
  code: string;
  action: string;
}

export const Modal = (props: IModalProps) => {
  
  const {
    id,
    selectedRow, 
    data,
    onClose
  } = props;

  const {

  } = data;

  const successCodes: ICode[] = [];
  const failureCodes: ICode[] = [];

  const onSetCodes = (dt: any) => {
    console.log("[LOG] onSetCodes", dt);
  }

  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  const [successCodesData, setSuccessCodesData] = useState<any[]>([...successCodes, { code: '', action: '' }]);
  const [failureCodesData, setFailureCodesData] = useState<any[]>([...failureCodes, { code: '', action: '' }]);

  const handleSetData = () => {
    let tempSuccessCodes = [...successCodesData];
    let tempFailureCodes = [...failureCodesData];
    tempSuccessCodes.pop();
    tempFailureCodes.pop();
    const data = {
      successCodes: tempSuccessCodes,
      failureCodes: tempFailureCodes
    };
    if (onSetCodes) {
      onSetCodes(data);
      onClose(false);
    }
  };

  const handleSuccessCodeChange = (value, index, field) => {
    if (field === 'code' && value) {
      const tempSuccessData = [...successCodesData];
      if (!tempSuccessData[index].code) {
        tempSuccessData[index].code = value;
        setSuccessCodesData([...tempSuccessData, { code: '', action: '' }]);
      } else {
        tempSuccessData[index].code = value;
        setSuccessCodesData([...tempSuccessData]);
      }
    }
    if (field === 'action') {
      const tempSuccessData = [...successCodesData];
      tempSuccessData[index].action = value;
      setSuccessCodesData([...tempSuccessData]);
    }
  };

  const handleFailureCodeChange = (value, index, field) => {
    if (field === 'code' && value) {
      const tempFailureData = [...failureCodesData];
      if (!tempFailureData[index].code) {
        tempFailureData[index].code = value;
        setFailureCodesData([...tempFailureData, { code: '', action: '' }]);
      } else {
        tempFailureData[index].code = value;
        setFailureCodesData([...tempFailureData]);
      }
    }
    if (field === 'action') {
      const tempFailureData = [...failureCodesData];
      tempFailureData[index].action = value;
      setFailureCodesData([...tempFailureData]);
    }
  };

  return (
    <BasicModal open={showModal} onClose={() => onClose(false)}>
      <div className={styles.successWrapper}>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.success')}</div>
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>HTTP STATUS CODE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(successCodesData || []).map((element: any, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <InputBase
                      // variant="standard"
                      // defaultValue={element.code}
                      value={element.code}
                      placeholder="Input success code."
                      classes={{ root: styles.textRoot }}
                      onChange={(e) => handleSuccessCodeChange(e.target.value, index, 'code')}
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      // variant="standard"
                      // defaultValue={element.action}
                      value={element.action}
                      placeholder="Input action."
                      classes={{ root: styles.textRoot }}
                      onChange={(e) => handleSuccessCodeChange(e.target.value, index, 'action')}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={styles.failureWrapper}>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.failure')}</div>
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>HTTP STATUS CODE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(failureCodesData || []).map((element: any, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <InputBase
                      // variant="standard"
                      // defaultValue={element.code}
                      value={element.code}
                      placeholder="Input failure code."
                      classes={{ root: styles.textRoot }}
                      onChange={(e) => handleFailureCodeChange(e.target.value, index, 'code')}
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      // variant="standard"
                      // defaultValue={element.action || 'failure'}\
                      value={element.action}
                      placeholder="Input failure action."
                      classes={{ root: styles.textRoot }}
                      onChange={(e) => handleFailureCodeChange(e.target.value, index, 'action')}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          borderRadius: 1
        }}
      >
        <Button variant="outlined" classes={{ root: styles.btnOk }} onClick={handleSetData} text="OK" />
        <Button variant="outlined" classes={{ root: styles.btnCancel }} onClick={(e: any) => onClose(false)} text="Cancel" />
      </Box>
    </BasicModal>
  );
};
