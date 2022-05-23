import React from 'react';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import ReactFlowWrapper from '../components/ReactFlowWrapper';

import styles from './styles.module.scss';

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['navigator', 'cookie', 'querystring', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain']
    },
    backend: {
      // crossDomain: true,
      // withCredentials: true, // These are for CORS requests from the browser
      // loadPath: `${process.env.REACT_APP_AWS_S3_TRANSLATIONS_ENDPOINT}/locales/{{lng}}/translations.json`,
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

const WorkflowSetupPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <ReactFlowWrapper />
    </div>
  );
};

export default WorkflowSetupPage;
