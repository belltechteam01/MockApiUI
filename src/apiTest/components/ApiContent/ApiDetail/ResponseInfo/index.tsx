import { FormControl, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { iApiTabProps, TabPanelProps } from '../../../../types';
import styles from './styles.module.scss';
import { BodyComp } from './BodyComp';
import { HeadersComp } from './HeadersComp';
import { Input, Label } from '../../../../../common/styled';

export interface IResponseInfoProps {
  info?: IResInfo;
}

interface IResInfo {
  body?: any;
  headers?: any[];
  status?: string;
}

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

export const ResponseInfo = ({ info }: IResponseInfoProps) => {
  const { body = {}, headers, status = '' } = info || {};
  const { t } = useTranslation();
  const initResponseTabs = [
    {
      id: 0,
      name: t('apiTest.setting.response.info.body.title'),
      value: 'body'
    },
    {
      id: 1,
      name: t('apiTest.setting.response.info.headers.title'),
      value: 'headers'
    }
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const [responseTabs] = useState<iApiTabProps[]>(initResponseTabs);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const renderTabPanel = (tab: iApiTabProps) => {
    let ele;
    switch (tab.value) {
      case 'body':
        ele = <BodyComp body={body} />;
        break;
      case 'headers':
        ele = <HeadersComp headers={headers} />;
        break;

      default:
        ele = <></>;
        break;
    }

    return ele;
  };

  return (
    <div className={styles.container}>
      <div className={styles.spaceBetweenContainer}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" classes={{ indicator: styles.tabIndicator, root: styles.tabsRoot }}>
          {(responseTabs || []).map((tab, idx) => (
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
          {/* <span className={styles.status}>Status: 200</span> */}
        </Tabs>
        <FormControl className={styles.status}>
          <Label className={styles.statusLabel}>{t('apiTest.setting.response.info.status.label')}</Label>
          <Input
            id="resStatus"
            type="text"
            aria-describedby="resStatus-helper-text"
            className={styles.statusValue}
            value={status}
            onChange={(e: any) => {
              // if (handleUrl) handleUrl(e.target.value);
            }}
            readOnly
          />
        </FormControl>
      </div>
      {(responseTabs || []).map((tab, idx) => (
        <TabPanel key={idx} value={tabIndex} index={idx}>
          {renderTabPanel(tab)}
        </TabPanel>
      ))}
    </div>
  );
};
