import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, styled, Theme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import styles from './styles.module.scss';

const AppLayoutContainer = styled('div', {
  shouldForwardProp: (props) => props !== 'minimized'
})<{ minimized: boolean }>(({ theme, minimized }) => ({
  display: 'flex',
  flex: '1 1 auto',
  minWidth: 'calc(100% - 200px)',
  minHeight: '100vh',
  backgroundColor: '#F7F7F7',
  [theme.breakpoints.up('md')]: {
    paddingLeft: minimized ? 60 : 200
  }
}));

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState<boolean>(false);

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    defaultMatches: true,
    noSsr: false
  });

  const handleSidebarToggle = useCallback(() => {
    if (mdUp) {
      setIsSidebarMinimized((prevState) => !prevState);
    } else {
      setIsSidebarOpen((prevState) => !prevState);
    }
  }, [mdUp]);

  const handleSidebarClose = (): void => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <AppLayoutContainer minimized={isSidebarMinimized}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: 'calc(100%-200px)',
            paddingTop: 8
          }}
        >
          <Outlet />
          {/* <Switch>
            {pages.map((page: Page) => (
              <Route exact key={page.key} path={page.path} component={page.component} />
            ))}
          </Switch> */}
        </Box>
      </AppLayoutContainer>
      <Navbar minimized={isSidebarMinimized} onSidebarToggle={handleSidebarToggle} />
      <Sidebar onClose={handleSidebarClose} open={isSidebarOpen} minimized={isSidebarMinimized} />
    </div>
  );
};

export default MainLayout;
