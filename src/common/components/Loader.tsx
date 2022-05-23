import React from 'react';

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#fff',
        zIndex: 99999
      }}
    >
      Loading...
    </div>
  );
};

export default Loader;
