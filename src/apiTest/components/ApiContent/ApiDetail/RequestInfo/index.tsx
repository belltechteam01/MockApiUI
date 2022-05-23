import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { iApiTabProps, TabPanelProps } from '../../../../types';
import { ParamsComp } from './ParamsComp';
import { AuthComp, IAuthComp } from './AuthComp';
import { BodyComp, IBodyComp } from './BodyComp';
import { HeadersComp } from './HeadersComp';
import styles from './styles.module.scss';
import { REQ_HEAD_CELLS } from '../../../../utils';
import { useApiContent } from '../../../../contexts/ApiContentContext';

export interface IRequestInfoProps {
  info?: IRequestSettingInfo;
}

export interface IRequestSettingInfo {
  params?: any[];
  auth?: IAuthComp;
  headers?: any[];
  body?: IBodyComp;
}

const headNames = REQ_HEAD_CELLS.map((headCell) => headCell.name);
const convertTableData = (data: any[], isNew: boolean) => {
  let isPlus = false;
  let newData = data.map((item: any, idx) => {
    let tempData: any = {};
    let isValue = false;
    headNames.map((headName) => {
      tempData.reqFieldName = headName;
      if (headName === 'isConstant') tempData[headName] = item[headName] ?? false;
      else tempData[headName] = item[headName] ?? '';

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
    tempData.reqIsChecked = false;
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

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

export const RequestInfo = ({ info }: IRequestInfoProps) => {
  const { t } = useTranslation();
  const { parameters, reqHeaders, handleParameters, handleReqHeaders } = useApiContent();
  const initRequestTabs = [
    {
      id: 0,
      name: t('apiTest.setting.request.info.params.title'),
      value: 'params'
    },
    {
      id: 1,
      name: t('apiTest.setting.request.info.auth.title'),
      value: 'auth'
    },
    {
      id: 2,
      name: t('apiTest.setting.request.info.headers.title'),
      value: 'headers'
    },
    {
      id: 3,
      name: t('apiTest.setting.request.info.body.title'),
      value: 'body'
    }
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const [requestTabs] = useState<iApiTabProps[]>(initRequestTabs);

  const [params, setParams] = useState<any[]>([]);
  const [isNewParam, setIsNewParam] = useState(false);
  const [head, setHead] = useState<any[]>([]);
  const [isNewHeader, setIsNewHeader] = useState(false);

  useEffect(() => {
    const initParams = convertTableData(parameters || [], false);
    setIsNewParam(initParams.isNew);
    setParams(initParams.tableData);
  }, [parameters]);

  useEffect(() => {
    const initHeaders = convertTableData(reqHeaders || [], false);
    setIsNewHeader(initHeaders.isNew);
    setHead(initHeaders.tableData);
  }, [reqHeaders]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleChangeParams = (value: any) => {
    const tempParams = convertTableData(value, isNewParam);
    setParams(tempParams.tableData);
    setIsNewParam(tempParams.isNew);
    if (handleParameters) handleParameters(tempParams.tableData);
    // const filterParams = tempParams.tableData.filter(
    //   (item) => item.isChecked && (item.key || item.value)
    // );
    // let tempUrl = url;
    // filterParams.map((item, index) => {
    //   if (index === 0) tempUrl = `${tempUrl}?${item.key}=${item.value}`;
    //   else tempUrl = `${tempUrl}&${item.key}=${item.value}`;
    // });
    // if (handleUrl) handleUrl(tempUrl);
  };

  const handleChangeHeaders = (value: any) => {
    const tempHeaders = convertTableData(value, isNewHeader);
    setHead(tempHeaders.tableData);
    setIsNewHeader(tempHeaders.isNew);
    if (handleReqHeaders) handleReqHeaders(tempHeaders.tableData);
  };

  const handlePanel = (tab: iApiTabProps) => {
    let ele;
    switch (tab.value) {
      case 'params':
        ele = <ParamsComp params={params} onChangeParams={handleChangeParams} />;
        break;
      case 'auth':
        ele = <AuthComp />;
        break;
      case 'body':
        ele = <BodyComp />;
        break;
      case 'headers':
        ele = <HeadersComp headers={head} onChangeHeaders={handleChangeHeaders} />;
        break;

      default:
        ele = <></>;
        break;
    }

    return ele;
  };

  return (
    <div className={styles.settingInfo}>
      <div className={styles.spaceBetweenContainer}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" classes={{ indicator: styles.tabIndicator, root: styles.tabsRoot }}>
          {(requestTabs || []).map((tab, idx) => (
            <Tab
              key={idx}
              label={
                <span
                  className={cn(styles.tabLabel, {
                    [styles.active]: tabIndex == idx
                  })}
                >
                  {tab.name}
                </span>
              }
              classes={{
                root: cn(styles.tabRoot, {
                  [styles.active]: tabIndex == idx
                })
              }}
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </div>
      {(requestTabs || []).map((tab, idx) => (
        <TabPanel key={idx} value={tabIndex} index={idx}>
          {handlePanel(tab)}
        </TabPanel>
      ))}
    </div>
  );
};
