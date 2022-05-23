import React from 'react';
import ReactFlowWrapper from 'component/ReactFlowWrapper';
// import ReactFlowWrapper from './../component/ReactFlowWrapper/index';

import styles from './styles.module.scss';

const WorkflowSetupPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <ReactFlowWrapper />
    </div>
  );
};

export default WorkflowSetupPage;
