import React from 'react';
import { Outlet } from 'react-router-dom';
// import styles from './styles.module.scss';

const LoginLayout = () => {
  return (
    <div>
      Login layout
      <Outlet />
    </div>
  );
};

export default LoginLayout;
