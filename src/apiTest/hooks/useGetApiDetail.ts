import { useCallback, useState } from 'react';
import { smsJourneyApi as axios } from '../../common/helpers/apiClient';
import useAuth from '../../common/hooks/useAuth';

export interface IUseGetApiDetail {
  apiDetail: Function;
  isLoading: boolean;
  data: any;
  error: string | null;
}

export interface IUseGetApiDetailProps {
  apiId: string;
}

const useGetApiDetail = ({ apiId }: IUseGetApiDetailProps): IUseGetApiDetail => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>('');
  const token = useAuth();

  const apiDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      if (token) {
        (axios.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
        const apiResponse = await axios.get(`/apiengine/api-engine/active/1/${apiId}`);

        setError('');
        setData(apiResponse.data.Items as any[]);
      } else {
        setError('token error');
        setData([]);
      }
    } catch (error) {
      setError('server error');
      setData([]);
    }
    setIsLoading(false);
  }, [token]);

  return { apiDetail, isLoading, data, error };
};

export default useGetApiDetail;
