import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputTable } from '../../../../../../common/components/Based/InputTable';
import ConnectForm from '../../../../../../common/components/ConnectForm';
import { RES_HEAD_CELLS } from '../../../../../utils';
import { IHeadersCompProps } from '../../RequestInfo/HeadersComp';

const headNames = RES_HEAD_CELLS.map((headCell) => headCell.name);
const convertTableData = (data: any[], isNew: boolean) => {
  let isPlus = false;
  let newData = data.map((item: any, idx) => {
    let tempData: any = {};
    let isValue = false;
    headNames.map((headName) => {
      tempData.fieldName = headName;
      tempData[headName] = item[headName] ?? '';
      if (isNew && data.length - 1 === idx && item[headName]) tempData.isChecked = true;
      if (data.length > idx && item[headName]) isValue = true;
    });
    if (!tempData?.isChecked) tempData.isChecked = item.isChecked || false;
    isPlus = isValue;
    return tempData;
  });

  if (isPlus || data.length === 0) {
    let tempData: any = {};
    headNames.map((headName) => (tempData[headName] = ''));
    tempData.isChecked = false;
    return {
      tableData: [...newData, tempData],
      isNew: true
    };
  } else {
    return {
      tableData: newData,
      isNew: isNew
    };
  }
};

export const HeadersComp = ({ headers }: IHeadersCompProps) => {
  const { getValues, setValue, register } = useFormContext();
  const [tableData, setTableData] = useState(convertTableData(headers || [], false).tableData);
  const [isNew, setIsNew] = useState(convertTableData([], false).isNew);

  const handleTableData = (newValue: any, cellName: string, idx: number) => {
    let tempData = [...tableData];
    tempData[idx][cellName] = newValue;
    setTableData(convertTableData(tempData, isNew).tableData);
    setIsNew(convertTableData(tempData, isNew).isNew);
  };

  const handleRowDelete = (index: number) => {
    const tempData = [...tableData].filter((item, idx) => idx !== index);
    setTableData(convertTableData(tempData, isNew).tableData);
    setIsNew(convertTableData(tempData, isNew).isNew);
  };

  useEffect(() => {
    if (typeof getValues('apiTest.headers') === 'undefined') register('apiTest.headers');
    setValue('apiTest.headers', tableData);
  }, [tableData]);

  return (
    <ConnectForm>
      {({ getValues, register, setValue }) => (
        <div>
          <div>
            <InputTable headCells={RES_HEAD_CELLS} tableData={tableData} isBasic onChange={handleTableData} onRowDelete={handleRowDelete} />
          </div>
        </div>
      )}
    </ConnectForm>
  );
};
