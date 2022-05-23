import { useCallback, useState } from 'react';
import { smsJourneyApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';

export interface IUseGetApisProps {
  fetchApis: Function;
  isLoading: boolean;
  apis: Apis[];
  error: string | null;
}

export interface Apis {
  apiName: string;
  apiId: string;
  apiUrl?: string;
  creationDate: string;
  dataElements?: any;
}

const useGetApis = (): IUseGetApisProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [apis, setApis] = useState<Apis[]>([]);
  const [error, setError] = useState<string>('');
  const token = useAuth();

  const fetchApis = useCallback(async () => {
    setIsLoading(true);
    try {
      if (token) {
        (axios.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
        const apiResponse = await axios.get('/apiengine/api-engine/active/1/');

        setError('');
        setApis(apiResponse.data.Items as Apis[]);
      } else {
        setError('token error');
        setApis([]);
      }
    } catch (error) {
      setError('server error');
      setApis([]);
    }
    setIsLoading(false);
  }, [token]);

  return { fetchApis, isLoading, apis, error };
};

export default useGetApis;
