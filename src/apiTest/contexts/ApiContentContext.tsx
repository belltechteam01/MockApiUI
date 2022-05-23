import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiTestApi as axios } from '../../common/helpers/apiClient';
import { IApiContentContextProps } from './ApiContentContext.types';
import { IAuthComp } from '../components/ApiContent/ApiDetail/RequestInfo/AuthComp';
import { IBodyComp } from '../components/ApiContent/ApiDetail/RequestInfo/BodyComp';

const ApiContentContext = createContext<IApiContentContextProps>({});
const fileUrl = `/test/api-engine-details/v101`;

const toTableData = (items: any[] | undefined) => {
  if (typeof items === 'undefined') return [];
  return items.map((item) => {
    let data = { key: '', value: '', isChecked: false, isConstant: false };
    data.key = item?.reqKey;
    data.value = item?.reqValue;
    data.isChecked = item?.reqIsChecked;
    data.isConstant = item?.reqIsConstant;
    return data;
  });
};

const toAuthData = (auth: any) => {
  const type = auth?.reqType !== 'noAuth' ? 'oauth2' : 'noAuth';
  let data: any = {};
  if (auth?.type !== 'noAuth') {
    data.authUrl = auth?.reqAuthUrl || '';
    data.clientId = auth?.reqClientId || '';
    data.clientSecret = auth?.reqClientSecret || '';
    data.scope = auth?.reqScope || '';
  }
  data.type = type;
  return data;
};

const toBodyData = (body: any) => {
  let data: any = {};
  if (body?.reqType === 'raw') {
    data.data = body?.reqData;
    data.format = body?.reqFormat || 'json';
  }
  data.type = body?.reqType;
  return data;
};

export const ApiContentProvider = ({ children }) => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id') || '';
  const [apiData, setApiData] = useState<any>({});
  const [, setIsLoading] = useState(false);
  const [, setError] = useState<string>('');
  const [url, setUrl] = useState('');
  const [httpMethod, setHttpMethod] = useState('GET');
  const [parameters, setParameters] = useState<any[]>([]);
  const [authorization, setAuthorization] = useState({});
  const [bodyData, setBodyData] = useState({});
  const [reqHeaders, setReqHeaders] = useState<any[]>([]);
  const [resData, setResData] = useState<any>({});

  const { apiUrl, method, info } = apiData || {};
  const { params, auth, headers, body } = info || {};

  // useEffect(() => {
  //   console.log("apiData===>", apiDetail);
  //   setApiData(apiDetail);
  // }, [apiDetail, id]);

  useEffect(() => {
    setUrl(apiUrl || '');
  }, [apiUrl, id]);

  useEffect(() => {
    setHttpMethod(method || 'GET');
  }, [method, id]);

  useEffect(() => {
    setParameters(params || []);
  }, [params, id]);

  useEffect(() => {
    setAuthorization(auth || {});
  }, [auth, id]);

  useEffect(() => {
    setBodyData(body || {});
  }, [body, id]);

  useEffect(() => {
    setReqHeaders(headers || []);
  }, [headers, id]);

  useEffect(() => {
    setResData({});
  }, [id]);

  const handleUrl = (url: string) => {
    setUrl(url);
  };

  const handleHttpMethod = (method: string) => {
    setHttpMethod(method);
  };

  const handleParameters = (params: any[]) => {
    setParameters(params);
  };

  const handleReqHeaders = (headers: any[]) => {
    setReqHeaders(headers);
  };

  const handleAuthorization = (auth: IAuthComp) => {
    setAuthorization(auth);
  };

  const handleBodyData = (body: IBodyComp) => {
    setBodyData(body);
  };

  const handleApiData = (apiData: any) => {
    setApiData(apiData);
  };

  const handleResData = (res: any) => {
    setResData(res);
  };

  const getFile = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const itemId = params.itemId ?? '';
      const companyId = params.companyId ?? '1';
      const apiResponse = await axios.get(`${fileUrl}/${companyId}/${itemId}`);

      console.log('apiDetail===>', apiResponse.data);
      const fileData = apiResponse.data;
      if (fileData.result) {
        const paramsData = toTableData(fileData?.data?.reqParams || []);
        // console.log("paramsData===>", paramsData);
        const headersData = toTableData(fileData?.data?.reqHeaders || []);
        // console.log("headersData===>", headersData);
        const authData = toAuthData(fileData?.data?.reqAuth);
        // console.log("authData===>", authData);
        const bodyData = toBodyData(fileData?.data.reqBody);
        const data = {
          itemId: fileData.data.itemId,
          companyId: fileData.data.companyId,
          method: fileData.data.reqMethod,
          apiUrl: fileData.data.reqApiUrl,
          apiName: fileData.data.apiName,
          info: {
            params: paramsData,
            headers: headersData,
            body: bodyData,
            auth: authData
          }
        };
        console.log('data===>', data);
        setApiData(data);
        setError('');
      } else {
        setError('No File Data');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      apiData,
      url,
      httpMethod,
      parameters,
      authorization,
      bodyData,
      reqHeaders,
      resData,
      handleApiData,
      handleUrl,
      handleHttpMethod,
      handleParameters,
      handleAuthorization,
      handleBodyData,
      handleReqHeaders,
      getFile,
      handleResData
    }),
    [
      apiData,
      url,
      httpMethod,
      parameters,
      authorization,
      bodyData,
      reqHeaders,
      resData,
      handleApiData,
      handleUrl,
      handleHttpMethod,
      handleParameters,
      handleAuthorization,
      handleBodyData,
      handleReqHeaders,
      getFile,
      handleResData
    ]
  );

  return <ApiContentContext.Provider value={memoizedValue}>{children}</ApiContentContext.Provider>;
};

export const useApiContent = (): IApiContentContextProps => useContext(ApiContentContext);
