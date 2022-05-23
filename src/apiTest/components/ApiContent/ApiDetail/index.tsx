import React, { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, ReactSelect } from '../../../../common/styled';
import Button from '../../../../common/components/Based/Button';
import { ResponseInfo } from './ResponseInfo';
import ConnectForm from '../../../../common/components/ConnectForm';
import { useApiContent } from '../../../contexts/ApiContentContext';
import { IRequestSettingInfo, RequestInfo } from './RequestInfo';
import { IRequestInfoProps } from './RequestInfo/index';

import styles from './styles.module.scss';
import { useActions } from '../../../api/actions';

export interface IApiDetailProps extends IRequestInfoProps {
  resInfo?: any;
}

export interface IRequestInfo {
  httpMethod?: string;
  apiUrl?: string;
  info?: IRequestSettingInfo;
}

const ApiDetail = ({ resInfo = {} }: IApiDetailProps) => {
  const { t } = useTranslation();
  const { url, httpMethod, apiData, parameters, authorization, reqHeaders, bodyData, handleUrl, handleHttpMethod } = useApiContent();
  const { sendRequest } = useActions();
  const { reset } = useFormContext();
  const apiMethodOption = [
    {
      label: t('apiTest.setting.request.method.get'),
      value: 'GET'
    },
    {
      label: t('apiTest.setting.request.method.post'),
      value: 'POST'
    },
    {
      label: t('apiTest.setting.request.method.put'),
      value: 'PUT'
    },
    {
      label: t('apiTest.setting.request.method.patch'),
      value: 'PATCH'
    },
    {
      label: t('apiTest.setting.request.method.delete'),
      value: 'DELETE'
    }
  ];
  const [method, setMethod] = useState('GET');

  useEffect(() => {
    setMethod(httpMethod || 'GET');
  }, [httpMethod]);

  useEffect(() => {
    if (url) reset({ apiTest: { url } });
  }, [url]);

  const handleSend = () => {
    console.log('===Send===');
    const tempData = {
      method: httpMethod,
      apiUrl: url,
      info: {
        params: parameters,
        headers: reqHeaders,
        body: bodyData,
        auth: authorization
      }
    };
    let tempApiData = { ...apiData, ...tempData };
    if (sendRequest) sendRequest(tempApiData);
  };
  return (
    <ConnectForm>
      {({ register, getValues, setValue }) => (
        <>
          <div className={styles.apiWrapper}>
            <div className={styles.apiMethodUrl}>
              <div className={styles.apiMethod}>
                <FormControl fullWidth variant="standard">
                  <ReactSelect
                    id="method"
                    aria-describedby="method-helper-text"
                    placeholder={t('apiTest.form.setting.request.placeholder.method')}
                    isSearchable={false}
                    options={apiMethodOption}
                    {...register('apiTest.method')}
                    value={apiMethodOption.filter((option) => option.value === method)}
                    onChange={(newValue: any) => {
                      if (handleHttpMethod) handleHttpMethod(newValue.value);
                    }}
                    styles={{
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 1001
                      }),
                      menu: (provided) => ({ ...provided, zIndex: 1001 })
                    }}
                  />
                </FormControl>
              </div>
              <div className={styles.apiUrl}>
                <FormControl fullWidth>
                  <Input
                    id="apiUrl"
                    type="text"
                    aria-describedby="apiUrl-helper-text"
                    placeholder={t('apiTest.form.setting.request.placeholder.apiUrl')}
                    value={url}
                    {...register('apiTest.apiUrl')}
                    onChange={(e: any) => {
                      if (handleUrl) handleUrl(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className={styles.sendBtnWrapper}>
              <Button text={t('apiTest.form.buttons.send')} onClick={handleSend} />
            </div>
          </div>
          <div className={styles.apiContentWrapper}>
            <div className={styles.reqInfoWrapper}>
              <RequestInfo />
            </div>
            <div className={styles.resInfoWrapper}>
              <ResponseInfo info={resInfo} />
            </div>
          </div>
        </>
      )}
    </ConnectForm>
  );
};

export default ApiDetail;
