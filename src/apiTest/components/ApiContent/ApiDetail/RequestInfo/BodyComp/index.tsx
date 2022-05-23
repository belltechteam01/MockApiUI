import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConnectForm from '../../../../../../common/components/ConnectForm';
import { useApiContent } from '../../../../../contexts/ApiContentContext';
import { ReactSelect } from '../../../../../../common/styled';
import { JsonEditor } from '../../../../../../common/components/Based/JsonEditor';

import styles from './styles.module.scss';

export interface IBodyCompProps {
  body?: IBodyComp;
}

export interface IBodyComp {
  type?: string;
  format?: string;
  data?: string;
}

export const BodyComp = () => {
  const { bodyData, handleBodyData } = useApiContent();
  const { type = 'none', data = '', format = 'json' } = bodyData || {};
  const { t } = useTranslation();
  // const [jsonData, setJsonData] = useState<string | undefined>(data);
  // const [bodyType, setBodyType] = useState(type);
  const formatOptions = [
    {
      label: t('apiTest.setting.request.info.body.json'),
      value: 'json'
    }
  ];
  const selectedOption = formatOptions.find((item) => item.value === format) || formatOptions[0];

  // useEffect(() => {
  //   if (typeof getValues("apiTest.body.data") === "undefined")
  //     register("apiTest.body.data");
  //   setValue("apiTest.body.data", data);
  // }, [data]);

  // useEffect(() => {
  //   setValue("apiTest.body.type", type);
  // }, [type]);

  const handleChangeBody = (field: string, value: string | undefined) => {
    let tempBodyData: any = { ...bodyData };
    tempBodyData[field] = value;
    if (handleBodyData) handleBodyData(tempBodyData);
  };

  return (
    <ConnectForm>
      {({ register, setValue, formState, getValues }) => (
        <div className={styles.reqPanel}>
          <div className={styles.formatContainer}>
            <FormControl>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...register('apiTest.body.type')} value={type} onChange={(e) => handleChangeBody('type', e.target.value)}>
                <FormControlLabel sx={{ textTransform: 'none' }} value="none" control={<Radio />} label={t('apiTest.setting.request.info.body.type.none')} />
                <FormControlLabel sx={{ textTransform: 'none' }} value="raw" control={<Radio />} label={t('apiTest.setting.request.info.body.type.raw')} />
              </RadioGroup>
            </FormControl>
            {type === 'raw' && (
              <FormControl variant="standard">
                <ReactSelect
                  id="format"
                  aria-describedby="format-helper-text"
                  defaultValue={selectedOption}
                  options={formatOptions}
                  onChange={(newValue: any) => {}}
                  styles={{
                    menuPortal: (provided) => ({
                      ...provided,
                      zIndex: 1001
                    }),
                    menu: (provided) => ({ ...provided, zIndex: 1001 })
                  }}
                />
              </FormControl>
            )}
          </div>
          <div className={styles.jsonWrapper}>
            {type === 'raw' && (
              <FormControl fullWidth variant="standard">
                <JsonEditor height={30} defaultValue={data} onChange={(value, event) => handleChangeBody('data', value)} />
              </FormControl>
            )}
            {type === 'none' && <div className={styles.noBody}>{t('apiTest.setting.request.info.body.message.none')}</div>}
          </div>
        </div>
      )}
    </ConnectForm>
  );
};
