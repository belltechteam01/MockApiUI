import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../../common/components/Based/Breadcrumbs';
import Button from '../../../common/components/Based/Button';
import ApiDetail, { IApiDetailProps } from './ApiDetail';
import { ISelectedField } from '../../../common/components/Based/Breadcrumbs/Breadcrumbs.types';
import { IBreadcrumbsItem } from '../../../common/components/Based/Breadcrumbs/Breadcrumbs.types';
import ApiList, { IApiListProps } from './ApiList';

import styles from './styles.module.scss';
import { useApiContent } from '../../contexts/ApiContentContext';
import { useActions } from '../../api/actions';

export interface IApiContentProps extends IApiDetailProps, IApiListProps {
  treePath?: ISelectedField[];
}

const convertDirectories = (items: ISelectedField[]): IBreadcrumbsItem[] => {
  return items.map((item) => {
    return {
      label: item.name,
      link: `/api-test?type=${item.type}&id=${item.id}`,
      info: item
    };
  });
};

export const ApiContent = ({ resInfo, treePath, childList }: IApiContentProps) => {
  const { apiData, url, httpMethod, parameters, authorization, reqHeaders, bodyData, handleApiData, getFile } = useApiContent();
  const { updateRequest } = useActions();
  const { t } = useTranslation();
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('type') || '';
  const [directories, setDirectories] = useState<IBreadcrumbsItem[]>([]);

  useEffect(() => {
    const initBreadcrumbs = convertDirectories(treePath || []);
    setDirectories(initBreadcrumbs);
  }, [treePath]);

  const handleSave = async () => {
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
    if (handleApiData) handleApiData(tempApiData);
    if (updateRequest) {
      const res = await updateRequest(tempApiData);
      if (res?.result && getFile) getFile({ itemId: apiData.itemId || '' });
    }
  };

  const renderAPI = () => {
    let element;
    switch (type) {
      case 'COLLECTION':
        element = <ApiList childList={childList} />;
        break;

      case 'FOLDER':
        element = <ApiList childList={childList} />;
        break;

      case 'REQUEST':
        element = <ApiDetail resInfo={resInfo} />;
        break;

      case 'EXAMPLE':
        element = <ApiDetail resInfo={resInfo} />;
        break;

      default:
        element = <></>;
        break;
    }
    return element;
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbsWrapper}>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs items={directories} />
        </div>
        {(type === 'REQUEST' || type === 'EXAMPLE') && (
          <div className={styles.buttonWrapper}>
            <Button text={t('apiTest.form.buttons.save')} variant="outlined" onClick={handleSave} />
          </div>
        )}
      </div>
      {renderAPI()}
    </div>
  );
};
