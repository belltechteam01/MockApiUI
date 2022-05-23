import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/index';
import APITestPage from '../apiTest/pages/APITestPage';
import WorkflowPage from 'pages/workflow';
import Login from 'pages/auth/login';
import LoginLayout from 'layouts/LoginLayout';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/', element: <Navigate to="/workflow-mgmt" /> },
      { path: '/workflow-mgmt', element: <WorkflowPage /> },
      { path: '/api-test', element: <APITestPage /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <LoginLayout /> : <Navigate to="/workflow-mgmt" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> }
    ]
  }
];

export default routes;
