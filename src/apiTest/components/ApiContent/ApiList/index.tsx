import React, { useEffect, useState } from 'react';
import { InputTable } from '../../../../common/components/Based/InputTable';
import { ITreeItemData } from '../../NavTree/TreeComponent';
import styles from './styles.module.scss';

export interface IApiListProps {
  childList?: ITreeItemData[];
}

const headers = [
  {
    id: 'id',
    name: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'type',
    name: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type'
  },
  {
    id: 'name',
    name: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'method',
    name: 'method',
    numeric: false,
    disablePadding: false,
    label: 'Method'
  }
];

const ApiList = ({ childList }: IApiListProps) => {
  const [tableData, setTableData] = useState<ITreeItemData[]>([]);

  useEffect(() => {
    setTableData(childList || []);
  }, [childList]);
  return (
    <div className={styles.container}>
      <InputTable headCells={headers} tableData={tableData} isBasic />
    </div>
  );
};

export default ApiList;
