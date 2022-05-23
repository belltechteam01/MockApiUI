import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../common/hooks/useAuth';
import { apiTestApi } from '../../common/helpers/apiClient';
import { ITreeItemData } from '../components/NavTree/TreeComponent';
import {
  convertToResHeaders,
  INIT_REQUEST_DATA,
  INIT_RESPONSE_DATA,
  parseFolderList,
  toAuthData,
  toBodyData,
  toReqAuth,
  toReqAxiosAuth,
  toReqAxiosBody,
  toReqAxiosParams,
  toReqBody,
  toReqParams,
  toTableData
} from '../utils';
import { useApiContent } from '../contexts/ApiContentContext';
import { REQ_URLS } from './../utils/Constant';
import { IActionsResponseProps } from './action.types';

export const useActions = (): IActionsResponseProps => {
  const navigate = useNavigate();
  const { handleResData, handleApiData } = useApiContent();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [folders, setFolders] = useState<ITreeItemData[]>([]);

  const token = useAuth();

  useEffect(() => {
    if (token) {
      (apiTestApi.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
    }
  }, [token]);

  const getFolderAll = useCallback(async (companyId?) => {
    setIsLoading(true);
    try {
      const _companyId = companyId ?? 1;
      const apiResponse = await apiTestApi.get(`${REQ_URLS.folderAllUrl}/${_companyId}`);
      setError('');
      if (apiResponse.data.result) {
        const folders = parseFolderList(apiResponse.data.data.items);
        // const folders = TREEVIEW_DATA;
        setFolders(folders);
      }
    } catch (error) {
      setError('server error');
      setFolders([]);
    }
    setIsLoading(false);
  }, []);

  const addCollection = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const itemName = (params && params.itemName) ?? 'New Collection';

      const addParam = {
        itemName,
        companyId
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.addCollectionUrl}`, addParam);

      if (apiResponse.data.result) {
        const newId = apiResponse.data.data.inserted.itemId;
        const newType = apiResponse.data.data.inserted.itemCatagory;
        await getFolderAll();
        navigate(`/api-test?type=${newType}&id=${newId}`);
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const deleteCollection = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = params.companyId ?? '1';
      const collectionId = params.collectionId ?? '';

      const apiResponse = await apiTestApi.delete(`${REQ_URLS.deleteCollectionUrl}/${companyId}/${collectionId}`);

      if (apiResponse.data.result) {
        await getFolderAll();
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const addFolder = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const collectionId = (params && params.collectionId) ?? '';
      const parentId = (params && params.parentId) ?? '';
      const itemName = (params && params.itemName) ?? 'New Folder';

      const addParam = {
        itemName,
        companyId,
        collectionId,
        parentId
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.addFolderUrl}`, addParam);

      if (apiResponse.data.result) {
        await getFolderAll();
        // history.push(`/api-test?type=${newType}&id=${newId}`);
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  // can use the updateFolder for rename (collection, folder, request, example)
  const updateFolder = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const collectionId = (params && params.collectionId) ?? '';
      const itemId = (params && params.itemId) ?? '';
      const itemName = (params && params.itemName) ?? '';

      const param = {
        companyId,
        collectionId,
        itemId,
        itemName
      };
      const apiResponse = await apiTestApi.put(`${REQ_URLS.updateFolderUrl}`, param);

      if (apiResponse.data.result) {
        await getFolderAll();
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const deleteFolder = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = params.companyId ?? '1';
      const collectionId = params.collectionId ?? '';
      const itemId = params.itemId ?? '';

      const apiResponse = await apiTestApi.delete(`${REQ_URLS.deleteFolderUrl}/${companyId}/${collectionId}/${itemId}`);

      if (apiResponse.data.result) {
        await getFolderAll();
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const duplicateFolder = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = params.companyId ?? '1';
      const collectionId = params.collectionId ?? '';
      const parentId = params.parentId ?? '';
      const itemId = params.itemId ?? '';

      const param = {
        collectionId,
        companyId,
        parentId,
        itemId
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.duplicateFolderUrl}`, param);

      if (apiResponse.data.result) {
        await getFolderAll();
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const addRequest = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const collectionId = (params && params.collectionId) ?? '';
      const parentId = (params && params.parentId) ?? '';
      const method = (params && params?.method) ?? 'GET';
      const reqApiName = (params && params.itemName) ?? 'New Request';
      const requestData = { ...INIT_REQUEST_DATA, ...{ reqApiName } };
      const addParam = {
        itemName: reqApiName,
        companyId,
        collectionId,
        parentId,
        method,
        requestData
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.addFileUrl}`, addParam);

      if (apiResponse.data.result) {
        const newId = apiResponse.data.data.inserted.itemId;
        const newType = 'REQUEST';
        await getFolderAll();
        navigate(`/api-test?type=${newType}&id=${newId}`);
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const updateRequest = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const itemId = (params && params.itemId) ?? '';
      const reqApiUrl = (params && params.apiUrl) ?? '';
      const reqMethod = (params && params.method) ?? '';
      const reqApiName = (params && params.reqApiName) ?? '';
      const tempApiParams = (params && params?.info?.params) ?? [];
      const reqParams = toReqParams(tempApiParams);
      const tempApiHeaders = (params && params?.info?.headers) ?? [];
      const reqHeaders = toReqParams(tempApiHeaders);
      const tempApiAuth = (params && params?.info?.auth) ?? {};
      const reqAuth = toReqAuth(tempApiAuth);
      const tempApiBody = (params && params?.info?.body) ?? {};
      const reqBody = toReqBody(tempApiBody);

      const updateParam = {
        itemId,
        companyId,
        requestData: {
          reqApiName,
          reqApiUrl,
          reqMethod,
          reqAuth,
          reqBody,
          reqHeaders,
          reqParams
        }
      };
      const apiResponse = await apiTestApi.put(`${REQ_URLS.updateFileUrl}`, updateParam);

      if (apiResponse.data.result) return apiResponse.data;
      else {
        setError('server error');
        return false;
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const deleteRequest = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = params.companyId ?? '1';
      const collectionId = params.collectionId ?? '';
      const itemId = params.itemId ?? '';

      const apiResponse = await apiTestApi.delete(`${REQ_URLS.deleteFileUrl}/${companyId}/${collectionId}/${itemId}`);

      if (apiResponse.data.result) {
        await getFolderAll();
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const duplicateRequest = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const collectionId = (params && params.collectionId) ?? '';
      const itemId = (params && params.itemId) ?? '';

      const duplicateParam = {
        collectionId,
        itemId,
        companyId
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.duplicateFileUrl}`, duplicateParam);
      console.log('resultRequest==>', apiResponse.data);
      if (apiResponse.data.result) {
        const newId = apiResponse.data.data.inserted.itemId;
        const newType = 'REQUEST';
        await getFolderAll();
        navigate(`/api-test?type=${newType}&id=${newId}`);
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const sendRequest = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const reqApiUrl = (params && params.apiUrl) ?? '';
      const reqMethod = (params && params.method) ?? '';
      const tempApiParams = (params && params?.info?.params) ?? [];
      const reqParams = toReqAxiosParams(tempApiParams);
      const tempApiHeaders = (params && params?.info?.headers) ?? [];
      const reqHeaders = toReqAxiosParams(tempApiHeaders);
      const tempApiAuth = (params && params?.info?.auth) ?? {};
      const reqAuth = toReqAxiosAuth(tempApiAuth);
      const tempApiBody = (params && params?.info?.body) ?? {};
      const reqBody = toReqAxiosBody(tempApiBody);

      const apiResponse = await axios({
        url: reqApiUrl,
        method: reqMethod,
        params: reqParams,
        headers: reqHeaders,
        data: reqBody,
        withCredentials: reqAuth.type === 'oauth2',
        responseType: 'json'
      });

      const res = {
        status: apiResponse.status,
        body: {
          data: JSON.stringify(apiResponse.data)
        },
        headers: convertToResHeaders(apiResponse.headers)
      };
      if (handleResData) handleResData(res);
    } catch (error: any) {
      const res = {
        status: error.response.status,
        body: {
          data: JSON.stringify(error.response.data)
        },
        headers: convertToResHeaders(error.response.headers)
      };
      if (handleResData) handleResData(res);
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const addExample = async (params: any) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const collectionId = (params && params.collectionId) ?? '';
      const parentId = (params && params.parentId) ?? '';
      const method = (params && params?.method) ?? 'GET';
      const reqApiName = (params && params.itemName) ?? 'New Example';
      const requestData = { ...INIT_REQUEST_DATA };
      const responseData = { ...INIT_RESPONSE_DATA };
      const addParam = {
        itemName: reqApiName,
        companyId,
        collectionId,
        parentId,
        method,
        requestData,
        responseData
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.addExampleUrl}`, addParam);

      if (apiResponse.data.result) {
        const newId = apiResponse.data.data.inserted.itemId;
        const newType = 'EXAMPLE';
        await getFolderAll();
        navigate(`/api-test?type=${newType}&id=${newId}`);
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  };

  const deleteExample = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = params.companyId ?? '1';
      const collectionId = params.collectionId ?? '';
      const itemId = params.itemId ?? '';

      const apiResponse = await apiTestApi.delete(`${REQ_URLS.deleteExampleUrl}/${companyId}/${collectionId}/${itemId}`);

      if (apiResponse.data.result) {
        await getFolderAll();
        setError('');
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const duplicateExample = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const collectionId = (params && params.collectionId) ?? '';
      const itemId = (params && params.itemId) ?? '';

      const duplicateParam = {
        collectionId,
        itemId,
        companyId
      };
      const apiResponse = await apiTestApi.post(`${REQ_URLS.duplicateExampleUrl}`, duplicateParam);
      console.log('resultExample==>', apiResponse.data);
      if (apiResponse.data.result) {
        const newId = apiResponse.data.data.inserted.itemId;
        const newType = 'EXAMPLE';
        await getFolderAll();
        navigate(`/api-test?type=${newType}&id=${newId}`);
      } else {
        setError('server error');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const updateExample = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const companyId = (params && params.companyId) ?? '1';
      const itemId = (params && params.itemId) ?? '';
      const reqApiUrl = (params && params.apiUrl) ?? '';
      const reqMethod = (params && params.method) ?? '';
      const reqApiName = (params && params.reqApiName) ?? '';
      const tempApiParams = (params && params?.info?.params) ?? [];
      const reqParams = toReqParams(tempApiParams);
      const tempApiHeaders = (params && params?.info?.headers) ?? [];
      const reqHeaders = toReqParams(tempApiHeaders);
      const tempApiAuth = (params && params?.info?.auth) ?? {};
      const reqAuth = toReqAuth(tempApiAuth);
      const tempApiBody = (params && params?.info?.body) ?? {};
      const reqBody = toReqBody(tempApiBody);

      const updateParam = {
        itemId,
        companyId,
        requestData: {
          reqApiName,
          reqApiUrl,
          reqMethod,
          reqAuth,
          reqBody,
          reqHeaders,
          reqParams
        },
        responseData: {
          reqBody: {},
          reqHeaders: []
        }
      };
      const apiResponse = await apiTestApi.put(`${REQ_URLS.updateExampleUrl}`, updateParam);

      if (apiResponse.data.result) return apiResponse.data;
      else {
        setError('server error');
        return false;
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  const getExample = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const itemId = params.itemId ?? '';
      const companyId = params.companyId ?? '1';
      const apiResponse = await apiTestApi.get(`${REQ_URLS.getExampleUrl}/${companyId}/${itemId}`);

      console.log('exampleDetail===>', apiResponse.data);
      const fileData = apiResponse.data;
      if (fileData.result) {
        const paramsData = toTableData(fileData?.data?.reqParams || []);
        // console.log("paramsData===>", paramsData);
        const headersData = toTableData(fileData?.data?.reqHeaders || []);
        // console.log("headersData===>", headersData);
        const authData = toAuthData(fileData?.data?.reqAuth);
        // console.log("authData===>", authData);
        const bodyData = toBodyData(fileData?.data.reqBody);
        const reqData = {
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
        console.log('example-data===>', reqData);
        if (handleApiData) handleApiData(reqData);
        setError('');
      } else {
        setError('No File Data');
      }
    } catch (error) {
      setError('server error');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (getFolderAll) getFolderAll();
  }, [getFolderAll]);

  return {
    isLoading,
    error,
    folders,
    getFolderAll,
    addCollection,
    deleteCollection,
    addFolder,
    updateFolder,
    deleteFolder,
    duplicateFolder,
    // apiDetail,
    // getFile,
    addRequest,
    updateRequest,
    deleteRequest,
    duplicateRequest,
    sendRequest,
    addExample,
    deleteExample,
    duplicateExample,
    updateExample,
    getExample
  };
};
