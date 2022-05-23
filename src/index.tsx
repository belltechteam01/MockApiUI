import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import WorkflowSetupPage from './pages/WorkflowSetupPage';
// import './index.css';
import 'styles/index.scss';
// import reportWebVitals from './reportWebVitals.js';
// import APITest from './APITest';
const container = document.getElementById('root') as Element;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkflowSetupPage />
    </BrowserRouter>
  </React.StrictMode>
);
