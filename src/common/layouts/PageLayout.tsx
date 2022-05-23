import React from 'react';

type PageLayoutProps = {
  children: React.ReactNode;
  action?: React.ReactNode;
  title: string;
};
const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children, title, action } = props;
  return (
    <div className="content">
      <div className="row mb-4 pb-2 pl-4 pr-4">
        <div className="col-sm-8 cret">
          <h3 className="mr-2">{title}</h3>
        </div>
        <div className="col-sm-4 cret-cncl">{action}</div>
      </div>
      <div className="row">
        <div className="col-lg-12">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
