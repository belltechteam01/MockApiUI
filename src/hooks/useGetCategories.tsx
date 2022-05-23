import { useCallback, useEffect, useState } from 'react';
import { awsApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';

export interface CategoryProps {
  campaignCategoryCode: string;
  campaignCategoryName: string;
  companyId: string;
}

const useGetCategories = (): CategoryProps[] => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const token = useAuth();

  const fetchCategories = useCallback(async () => {
    const res = await axios.get('/test/campaign-categories');
    const data = (await res.data) as CategoryProps[];
    setCategories(data);
  }, []);

  useEffect(() => {
    (axios.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
    fetchCategories();
  }, [fetchCategories, token]);

  return categories;
};

export default useGetCategories;
