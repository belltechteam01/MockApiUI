import React from 'react';
import { FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import ConnectForm from '../../../../../../common/components/ConnectForm';
import { Input, Label, ReactSelect } from '../../../../../../common/styled';

import styles from './styles.module.scss';
import { useApiContent } from '../../../../../contexts/ApiContentContext';

export interface IAuthCompProps {}

export interface IAuthComp {
  type?: string;
  authUrl?: string;
  clientId?: string;
  clientSecret?: string;
  scope?: string;
}

export const AuthComp = () => {
  const { authorization, handleAuthorization } = useApiContent();
  const { type = 'noAuth', authUrl = '', clientId = '', clientSecret = '', scope = '' } = authorization || {};
  const { t } = useTranslation();
  const typeOptions = [
    {
      label: t('apiTest.setting.request.info.auth.type.types.noAuth'),
      value: 'noAuth'
    },
    {
      label: t('apiTest.setting.request.info.auth.type.types.oauth2'),
      value: 'oauth2'
    }
  ];
  const { register } = useFormContext();

  const handleAuthChange = (field: string, value: string) => {
    let tempAuth: any = { ...authorization };
    tempAuth[field] = value;
    if (handleAuthorization) handleAuthorization(tempAuth);
  };

  const renderAuthSetting = () => {
    if (type === 'noAuth') {
      return <div className={styles.noAuth}>{t('apiTest.setting.request.info.auth.message.noAuth')}</div>;
    } else {
      return (
        <div className={styles.formContainer}>
          <FormControl fullWidth sx={{ marginBottom: 2 }} className={styles.formControl} variant="standard">
            <Label htmlFor="authUrl">{t('apiTest.form.setting.request.auth.label.authUrl')}</Label>
            <Input
              id="authUrl"
              type="text"
              aria-describedby="authUrl-helper-text"
              className={styles.inputText}
              placeholder={t('apiTest.form.setting.request.auth.placeholder.authUrl')}
              {...register('apiTest.auth.authUrl')}
              defaultValue={authUrl}
              onChange={(e) => handleAuthChange('authUrl', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }} className={styles.formControl} variant="standard">
            <Label htmlFor="clientId">{t('apiTest.form.setting.request.auth.label.clientId')}</Label>
            <Input
              id="clientId"
              type="text"
              aria-describedby="clientId-helper-text"
              className={styles.inputText}
              placeholder={t('apiTest.form.setting.request.auth.placeholder.clientId')}
              {...register('apiTest.auth.clientId')}
              defaultValue={clientId}
              onChange={(e) => handleAuthChange('clientId', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }} className={styles.formControl} variant="standard">
            <Label htmlFor="clientSecret">{t('apiTest.form.setting.request.auth.label.clientSecret')}</Label>
            <Input
              id="clientSecret"
              type="text"
              aria-describedby="clientSecret-helper-text"
              className={styles.inputText}
              placeholder={t('apiTest.form.setting.request.auth.placeholder.clientSecret')}
              {...register('apiTest.auth.clientSecret')}
              defaultValue={clientSecret}
              onChange={(e) => handleAuthChange('clientSecret', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }} className={styles.formControl} variant="standard">
            <Label htmlFor="scope">{t('apiTest.form.setting.request.auth.label.scope')}</Label>
            <Input
              id="scope"
              type="text"
              aria-describedby="scope-helper-text"
              className={styles.inputText}
              placeholder={t('apiTest.form.setting.request.auth.placeholder.scope')}
              {...register('apiTest.auth.scope')}
              defaultValue={scope}
              onChange={(e) => handleAuthChange('scope', e.target.value)}
            />
          </FormControl>
        </div>
      );
    }
  };

  return (
    <ConnectForm>
      {({ getValues, register, setValue }) => (
        <div className={styles.reqPanel}>
          <div className={styles.leftWrapper}>
            <FormControl fullWidth className={styles.typeWrapper} variant="standard">
              <Label htmlFor="type">{t('apiTest.setting.request.info.auth.type.label')}</Label>
              <ReactSelect
                id="type"
                aria-describedby="type-helper-text"
                value={typeOptions.filter((option) => option.value === type)}
                options={typeOptions}
                {...register('apiTest.auth.type')}
                onChange={(newValue: any) => {
                  handleAuthChange('type', newValue.value);
                  setValue('apiTest.auth.type', newValue.value);
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
          <div className={styles.rightWrapper}>{renderAuthSetting()}</div>
        </div>
      )}
    </ConnectForm>
  );
};
