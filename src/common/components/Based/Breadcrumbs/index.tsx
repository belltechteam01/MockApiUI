import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import { IBreadcrumbsItem, IBreadcrumbsProps } from './Breadcrumbs.types';

// styles
import styles from './Breadcrumbs.module.scss';
import Button from '../Button';

const Breadcrumbs = (props: IBreadcrumbsProps) => {
  const { items, onClick } = props;
  let navigate = useNavigate();

  function handleLink(event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>, link?: string) {
    event.preventDefault();
    if (link) navigate(link);
  }

  const handleClick = (item: IBreadcrumbsItem) => {
    console.log(item.info);
    if (item.info && onClick) onClick(item);
  };

  const renderItem = (item: IBreadcrumbsItem, key: number) => {
    if (item.link)
      return (
        <Link key={key} underline="hover" href={item.link} onClick={(e) => handleLink(e, item.link)}>
          {item.label}
        </Link>
      );
    else if (item.info) return <Button key={key} classes={{ root: styles.btnRoot }} text={item.label} clean onClick={() => handleClick(item)} />;
    else return <span key={key}>{item.label}</span>;
  };

  return (
    <MuiBreadcrumbs
      separator="/"
      classes={{
        root: styles.root,
        ol: styles.ol,
        li: styles.li,
        separator: styles.separatorLi
      }}
    >
      {(items || []).map((item, id) => renderItem(item, id))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
