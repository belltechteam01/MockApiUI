import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import APITestPage from './apiTest/pages/APITestPage';
import { ApiContentProvider } from './apiTest/contexts/ApiContentContext';

const APITest = () => {
  return (
    <Router>
      <ApiContentProvider>
        <APITestPage />
      </ApiContentProvider>
    </Router>
  );
};

export default APITest;
