import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import BasicModal from 'components/Based/BasicModal';
import styles from './styles.module.scss';
import Button from 'components/Based/Button';
import { useTranslation } from 'react-i18next';

const properties = [];

export const Modal = (props: any) => {
  const {

    onClose
  } = props;

  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOk = () => {
    
    onClose();
  };

  return (
    <BasicModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className={styles.successWrapper}>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.success')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>HTTP STATUS CODE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(properties || []).map((element: any, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {element[Object.keys(element)[0]].attributeName}
                  </TableCell>
                  <TableCell>{element[Object.keys(element)[0]]?.fieldPath}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={styles.failureWrapper}>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.failure')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>HTTP STATUS CODE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(properties || []).map((element: any, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {element[Object.keys(element)[0]].attributeName}
                  </TableCell>
                  <TableCell>{element[Object.keys(element)[0]]?.fieldPath}</TableCell>
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
        <Button variant="outlined" classes={{ root: styles.btnOk }} onClick={onOk} text="OK" />
        <Button variant="outlined" classes={{ root: styles.btnCancel }} onClick={(e: any) => setIsModalOpen(false)} text="Cancel" />
      </Box>
    </BasicModal>
  );
};

