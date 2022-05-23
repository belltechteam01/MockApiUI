import { useCallback, useEffect, useState } from 'react';
import { awsApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';

export interface LanguageProps {
  companyId: string;
  languageCode: string;
  languageName: string;
}

const useGetLanguages = (): LanguageProps[] => {
  const token = useAuth();
  const [languages, setLanguages] = useState<LanguageProps[]>([]);

  const fetchLanguages = useCallback(async () => {
    const res = await axios.get('/test/customer-languages');
    const data = (await res.data) as LanguageProps[];
    setLanguages(data);
  }, []);

  useEffect(() => {
    (axios.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
    fetchLanguages();
  }, [fetchLanguages, token]);

  return languages;
};

export default useGetLanguages;
