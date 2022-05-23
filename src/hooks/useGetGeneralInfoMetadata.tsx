import { useCallback, useEffect, useState } from 'react';
import { awsApi as axios } from '../helpers/apiClient';
import useAuth from './useAuth';
import { CategoryProps } from './useGetCategories';
import { JourneyProps } from './useGetJournies';
import { LanguageProps } from './useGetLanguages';

export interface GeneralInfoMetadataProps {
  campaignCategoryList?: {
    body: {
      Items: CategoryProps[];
      Count: number;
      ScannedCount: number;
    };
    statusCode: number;
  };
  languageList?: {
    body: {
      Items: LanguageProps[];
      Count: number;
      ScannedCount: number;
    };
    statusCode: number;
  };
  journeyTagList?: {
    body: {
      Items: JourneyProps[];
      Count: number;
      ScannedCount: number;
    };
    statusCode: number;
  };
}

const useGetGeneralInfoMetadata = (): GeneralInfoMetadataProps => {
  const token = useAuth();
  const [generalInfoMetadata, setGeneralInfoMetadata] = useState<GeneralInfoMetadataProps>();

  const fetchGeneralInfoMetadata = useCallback(async () => {
    const res = await axios.post('/test/getCampaignMetaDataGeneralInfo');
    const data = (await res.data) as GeneralInfoMetadataProps;
    setGeneralInfoMetadata(data);
  }, []);

  useEffect(() => {
    (axios.defaults.headers as any).Authorization = token ? `Bearer ${token}` : '';
    fetchGeneralInfoMetadata();
  }, [fetchGeneralInfoMetadata, token]);

  return generalInfoMetadata || {};
};

export default useGetGeneralInfoMetadata;
