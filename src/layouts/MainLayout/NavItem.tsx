import { Button, ListItem, Box } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItemProps {
  hrefs?: string[];
  icon: React.ReactNode;
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ hrefs, icon, title }) => {
  const location = useLocation();
  const active = hrefs && hrefs.includes(location.pathname);

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 1
      }}
    >
      <Button
        component={Link}
        to={hrefs ? hrefs[0] : '#'}
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active ? '#1239AE' : 'inherit',
          borderRadius: 20,
          color: active ? '#fff' : 'rgba(255, 255, 255, 0.75)',
          justifyContent: 'flex-start',
          fontSize: 14,
          pl: 2,
          pr: 7,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '&:hover': {
            backgroundColor: active ? '#1239AE' : 'rgba(255,255,255, 0.08)',
            color: '#fff'
          }
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

export default NavItem;
