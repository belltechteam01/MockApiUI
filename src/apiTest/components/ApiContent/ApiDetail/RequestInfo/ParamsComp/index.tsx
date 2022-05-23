import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputTable } from '../../../../../../common/components/Based/InputTable';
import { REQ_HEAD_CELLS } from '../../../../../utils';
import styles from './styles.module.scss';

export interface IParamsCompProps {
  params?: any[];
  onChangeParams?: Function;
}

export const ParamsComp = ({ params, onChangeParams }: IParamsCompProps) => {
  const { t } = useTranslation();

  const handleTableData = (newValue: any, cellName: string, idx: number) => {
    let tempData = [...(params || [])];
    tempData[idx][cellName] = newValue;
    if (onChangeParams) onChangeParams(tempData);
  };

  const handleRowDelete = (index: number) => {
    const tempData = [...(params || [])].filter((item, idx) => idx !== index);
    if (onChangeParams) onChangeParams(tempData);
  };

  return (
    <div className={styles.reqPanel}>
      <p className={styles.title}>{t('apiTest.setting.request.info.params.subTitle')}</p>
      <div>
        <InputTable headCells={REQ_HEAD_CELLS} tableData={params} onChange={handleTableData} onRowDelete={handleRowDelete} />
      </div>
    </div>
  );
};
