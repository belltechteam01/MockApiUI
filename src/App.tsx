import React, { Suspense, useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import Loader from 'common/components/Loader';
import routes from 'router';

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['navigator', 'cookie', 'querystring', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain']
    },
    backend: {
      // crossDomain: true,
      // withCredentials: true, // These are for CORS requests from the browser
      // loadPath: `${process.env.REACT_APP_AWS_S3_TRANSLATIONS_ENDPOINT}/locales/{{lng}}/translations.json`,
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

// Amplify.configure(awsconfig);

const App: React.FC = () => {
  const [isToken] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const { isLoggedIn } = useSelector((state) => state.auth);

  const routing = useRoutes(routes(isLoggedIn));

  useEffect(() => {
    setIsLoggedIn(isToken ?? false);
  }, [isToken]);

  // if (!isToken) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      {routing}
      {/* <AppLayoutContainer minimized={isSidebarMinimized}>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            <Routes>
              {pages.map((page: Page) => (
                <Route key={page.key} path={page.path} element={page.component} />
              ))}
            </Routes>
          </Box>
        </AppLayoutContainer>
        <Navbar minimized={isSidebarMinimized} onSidebarToggle={handleSidebarToggle} />
        <Sidebar onClose={handleSidebarClose} open={isSidebarOpen} minimized={isSidebarMinimized} /> */}
    </Suspense>
  );
};

export default App;
// export default withAuthenticator(App);
