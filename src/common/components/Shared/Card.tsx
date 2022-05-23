import React from 'react';

type CardProps = {
  children: React.ReactNode;
};
const Card: React.FC<CardProps> = (props) => {
  const { children } = props;
  return (
    <div className="card card-default">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
