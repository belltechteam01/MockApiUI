import { ListItem, Tooltip, IconButton } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface MinimizedNavItemProps {
  hrefs?: string[];
  icon: React.ReactNode;
  title: string;
}

const MinimizedNavItem: React.FC<MinimizedNavItemProps> = ({ hrefs, icon, title }) => {
  const location = useLocation();
  const active = hrefs && hrefs.includes(location.pathname);

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0
      }}
    >
      <Tooltip title={title}>
        <IconButton
          component={Link}
          to={hrefs ? hrefs[0] : '#'}
          disableRipple
          sx={{
            backgroundColor: active ? '#1239AE' : 'inherit',
            color: active ? '#fff' : 'rgba(255, 255, 255, 0.75)',
            fontSize: 14,
            boxSizing: 'border-box',
            borderRadius: 1,
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: active ? '#1239AE' : 'rgba(255,255,255, 0.08)',
              color: '#fff'
            }
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export default MinimizedNavItem;
