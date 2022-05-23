import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  const getAccessToken = useCallback(async (): Promise<void> => {
    const req = await axios.post('https://auth.justotp.com/oauth2/token', null, {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET
      }
    });

    const data = await req.data;

    setToken(data.access_token);
    setInterval(getAccessToken, data.expires_in * 1000);
  }, []);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  return token;
};

export default useAuth;
