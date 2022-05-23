import { useCallback, useState } from 'react';
import { devApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';

export interface IUseAddStepProps {
  addStep: Function;
  isLoading: boolean;
  returnData: any;
  error: string | null;
}

const useAddStep = (props: {}): IUseAddStepProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [returnData, setReturnData] = useState({});
  const [error, setError] = useState<string>('');
  const token = useAuth();

  const addStep = useCallback(
    async (props) => {
      setIsLoading(true);
      try {
        const apiResponse = await axios.post('/test/add-step', { ...props });

        setError('');
        setReturnData(apiResponse.data);
      } catch (error) {
        setError('server error');
        setReturnData({});
      }
      setIsLoading(false);
    },
    [token]
  );

  return { addStep, isLoading, returnData, error };
};

export default useAddStep;
