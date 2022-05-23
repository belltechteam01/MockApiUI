import React, { useMemo } from 'react';
import { FormControl } from '@mui/material';
import ConnectForm from '../../../../../../common/components/ConnectForm';
import { JsonEditor } from '../../../../../../common/components/Based/JsonEditor';

import styles from './styles.module.scss';
import { IBodyCompProps } from './../../RequestInfo/BodyComp/index';

const prettifyJsonString = (jsonString: string): string => {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, '\t');
  } catch (err) {
    return jsonString;
  }
};

export const BodyComp = ({ body }: IBodyCompProps) => {
  const { data = '' } = body || {};

  const jsonData = useMemo(() => {
    const tempData = prettifyJsonString(data);
    return tempData;
  }, [data]);

  return (
    <ConnectForm>
      {({ register, setValue, formState, getValues }) => (
        <div className={styles.container}>
          <div className={styles.jsonWrapper}>
            <FormControl fullWidth variant="standard">
              <JsonEditor
                height={20}
                readOnly
                value={jsonData}
                // onChange={(value) => setJsonData(value)}
              />
            </FormControl>
          </div>
        </div>
      )}
    </ConnectForm>
  );
};
