import React from 'react';
import { styled, AppBar, Toolbar, IconButton, Box, Badge, Avatar, Typography, Divider, alpha, InputBase } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon, Email as EmailIcon, Loop as LoopIcon } from '@mui/icons-material';
// import { useTranslation } from 'react-i18next';

interface NavbarProps {
  onSidebarToggle: () => void;
  minimized: boolean;
}

const NavbarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[0],
  borderBottom: '1px solid #EAEAEA'
}));

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  color: '#888',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle, minimized }) => {
  // const { t } = useTranslation();

  return (
    <NavbarContainer
      sx={{
        left: {
          md: minimized ? 60 : 200
        },
        width: {
          md: minimized ? 'calc(100% - 60px)' : 'calc(100% - 200px)'
        }
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 60,
          left: 0,
          px: 2
        }}
      >
        <IconButton size="medium" aria-label="menu" tabIndex={0} type="button" onClick={onSidebarToggle}>
          <MenuIcon />
        </IconButton>
        <Box
          flexGrow={1}
          sx={{
            display: {
              xs: 'inline-flex',
              md: 'none'
            }
          }}
        />
        <Search
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            }
          }}
        >
          <SearchInputBase fullWidth placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
        <Divider
          orientation="vertical"
          flexItem
          variant="fullWidth"
          sx={{
            minHeight: 60,
            border: '1px solid #EAEAEA',
            display: {
              xs: 'none',
              lg: 'block'
            }
          }}
        />
        {/* <Box flexGrow={1} /> */}
        <Typography
          variant="body1"
          color="GrayText"
          sx={{
            px: 4,
            display: {
              xs: 'none',
              lg: 'block'
            }
          }}
        >
          Last Updated:
          <b style={{ color: '#444444' }}>16.15</b>
          <IconButton>
            <LoopIcon />
          </IconButton>
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          variant="fullWidth"
          sx={{
            minHeight: 60,
            border: '1px solid #EAEAEA',
            display: {
              xs: 'none',
              lg: 'block'
            }
          }}
        />
        <IconButton size="medium" aria-label="menu" tabIndex={0} type="button" sx={{ ml: 1 }}>
          <EmailIcon />
        </IconButton>
        <IconButton size="medium" aria-label="menu" tabIndex={0} type="button" sx={{ ml: 1 }}>
          <Badge color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar
          alt="John Doe"
          src="/path/to/image"
          sx={{
            height: 40,
            width: 40,
            mx: 2,
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: '#1239AE'
          }}
        >
          SK
        </Avatar>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
