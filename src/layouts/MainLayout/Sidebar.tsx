import {
  // Campaign as CampaignIcon,
  // Dashboard as DashboardIcon,
  DomainVerification as VerificationIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  // Summarize as SummarizeIcon,
  Api as ApiIcon
} from '@mui/icons-material';
import { Box, Divider, Drawer, Hidden, List } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MinimizedNavItem from './MinimizedNavItem';
import NavItem from './NavItem';

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  minimized: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, minimized }) => {
  const { t } = useTranslation();

  const items = [
    {
      hrefs: ['/workflow-mgmt'],
      icon: <VerificationIcon fontSize="small" />,
      title: t('justotp.WORKFLOWS_LBL')
    },
    {
      hrefs: ['/api-test'],
      icon: <ApiIcon fontSize="small" />,
      title: t('justotp.APITEST_LBL')
    }
  ];

  const bottomItems = [
    {
      hrefs: ['/settings'],
      icon: <SettingsIcon fontSize="small" />,
      title: t('justotp.SETTINGS_LBL')
    },
    {
      hrefs: ['/help'],
      icon: <LogoutIcon fontSize="small" />,
      title: t('justotp.HELP_LBL')
    }
  ];

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 2 }}>
          <Link
            to="/"
            style={{
              textTransform: 'none',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
            SMS
            <span style={{ fontWeight: 'normal' }}>JOURNEY</span>
          </Link>
        </Box>
        <Divider
          sx={{
            borderColor: 'rgba(248, 237, 255, 0.15)',
            mb: 2
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <List
            sx={{
              listStyle: 'none',
              margin: 0,
              px: 0,
              pt: 0,
              pb: 8,
              position: 'relative'
            }}
          >
            {items.map((item) => (
              <NavItem key={item.title} icon={item.icon} hrefs={item.hrefs} title={item.title} />
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <List
            sx={{
              listStyle: 'none',
              m: 0,
              pb: 2,
              position: 'relative'
            }}
          >
            {bottomItems.map((item) => (
              <NavItem key={item.title} icon={item.icon} hrefs={item.hrefs} title={item.title} />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );

  const minimizedContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 2 }}>
          <Link
            to="/"
            style={{
              textTransform: 'none',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
            SJ
          </Link>
        </Box>
        <Divider
          sx={{
            borderColor: 'rgba(248, 237, 255, 0.15)',
            mb: 2
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <List
            sx={{
              listStyle: 'none',
              margin: 0,
              px: 0,
              pt: 0,
              pb: 8,
              position: 'relative'
            }}
          >
            {items.map((item) => (
              <MinimizedNavItem key={item.title} icon={item.icon} hrefs={item.hrefs} title={item.title} />
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <List
            sx={{
              listStyle: 'none',
              m: 0,
              pb: 2,
              position: 'relative'
            }}
          >
            {bottomItems.map((item) => (
              <MinimizedNavItem key={item.title} icon={item.icon} hrefs={item.hrefs} title={item.title} />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          onClose={onClose}
          open={open}
          PaperProps={{
            sx: {
              background: 'linear-gradient(180deg, #13193A 0%, #690F75 100%)',
              color: '#FFFFFF',
              width: 200
            }
          }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        {minimized ? (
          <Drawer
            anchor="left"
            open
            PaperProps={{
              sx: {
                background: 'linear-gradient(180deg, #13193A 0%, #690F75 100%)',
                color: '#FFFFFF',
                width: 60
              }
            }}
            variant="permanent"
          >
            {minimizedContent}
          </Drawer>
        ) : (
          <Drawer
            anchor="left"
            open
            PaperProps={{
              sx: {
                background: 'linear-gradient(180deg, #13193A 0%, #690F75 100%)',
                color: '#FFFFFF',
                width: 200
              }
            }}
            variant="permanent"
          >
            {content}
          </Drawer>
        )}
      </Hidden>
    </>
  );
};

export default Sidebar;
