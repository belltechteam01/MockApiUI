import { useCallback, useState } from 'react';
import { devApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';

export interface IUseTestStepProps {
  testStep: Function;
  isLoading: boolean;
  returnData: any;
  error: string | null;
}

const useTestStep = (props: {}): IUseTestStepProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [returnData, setReturnData] = useState({});
  const [error, setError] = useState<string>('');
  const token = useAuth();

  const testStep = useCallback(
    async (props) => {
      setIsLoading(true);
      try {
        const apiResponse = await axios.post('/test/test-step', { ...props });

        setError('');
        setReturnData(apiResponse.data);
      } catch (error) {
        setError('server error');
        setReturnData({ body: 'FAILED' });
      }
      setIsLoading(false);
    },
    [token]
  );

  return { testStep, isLoading, returnData, error };
};

export default useTestStep;
