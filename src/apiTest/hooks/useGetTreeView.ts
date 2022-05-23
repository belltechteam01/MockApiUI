import { useCallback, useState } from 'react';
import { smsJourneyApi as axios } from '../../common/helpers/apiClient';
import useAuth from '../../common/hooks/useAuth';

export interface IUseAddStepProps {
  treeView: Function;
  isLoading: boolean;
  data: any;
  error: string | null;
}

const useGetTreeView = (props: {}): IUseAddStepProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState<string>('');
  const token = useAuth();

  const treeView = useCallback(
    async (props) => {
      setIsLoading(true);
      try {
        const apiResponse = await axios.get('/apiengine/api-engine/active/1/');

        setError('');
        setData(apiResponse.data);
      } catch (error) {
        setError('server error');
        setData({});
      }
      setIsLoading(false);
    },
    [token]
  );

  return { treeView, isLoading, data, error };
};

export default useGetTreeView;
