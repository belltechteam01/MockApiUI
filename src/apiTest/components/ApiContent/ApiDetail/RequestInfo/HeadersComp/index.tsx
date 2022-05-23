import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputTable } from '../../../../../../common/components/Based/InputTable';
import { REQ_HEAD_CELLS } from '../../../../../utils';
import styles from './styles.module.scss';

export interface IHeadersCompProps {
  headers?: any[];
  onChangeHeaders?: Function;
}

export const HeadersComp = ({ headers, onChangeHeaders }: IHeadersCompProps) => {
  const { t } = useTranslation();

  const handleTableData = (newValue: any, cellName: string, idx: number) => {
    let tempData = [...(headers || [])];
    tempData[idx][cellName] = newValue;
    if (onChangeHeaders) onChangeHeaders(tempData);
  };

  const handleRowDelete = (index: number) => {
    const tempData = [...(headers || [])].filter((item, idx) => idx !== index);
    if (onChangeHeaders) onChangeHeaders(tempData);
  };

  return (
    <div className={styles.reqPanel}>
      <p className={styles.title}>{t('apiTest.setting.request.info.headers.subTitle')}</p>
      <div>
        <InputTable headCells={REQ_HEAD_CELLS} tableData={headers} onChange={handleTableData} onRowDelete={handleRowDelete} />
      </div>
    </div>
  );
};
