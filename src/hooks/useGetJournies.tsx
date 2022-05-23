import { useCallback, useEffect, useState } from 'react';
import { awsApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';

export interface JourneyProps {
  companyId: string;
  journeyCode: string;
  journeyName: string;
}

const useGetJournies = (): JourneyProps[] => {
  const token = useAuth();
  const [journies, setJournies] = useState<JourneyProps[]>([]);

  const fetchJournies = useCallback(async () => {
    const res = await axios.get('/test/customer-journies');
    const data = (await res.data) as JourneyProps[];
    setJournies(data);
  }, []);

  useEffect(() => {
    (axios.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
    fetchJournies();
  }, [fetchJournies, token]);

  return journies;
};

export default useGetJournies;
