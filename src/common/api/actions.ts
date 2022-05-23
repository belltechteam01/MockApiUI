import wretch, { Wretcher } from 'wretch';
// import { getCookie } from '../../helpers/cookies';
import { getCookie } from '../helpers/cookies';
import { Auth } from './schema/auth.schema';
import type { Post } from './types';

export interface ActionCreators {
  getToken: Post<Record<string, unknown>, Auth>;
  getCampaigns: Post<Record<string, unknown>, Record<string, unknown>>;
}

const token = `${process.env.REACT_APP_AUTH_API_URL}`;
const campaigns = `${process.env.REACT_APP_DEFAULT_API_URL}/campaigns`;

export const getActionCreators = (gateway: Wretcher): ActionCreators => ({
  getToken: (body) =>
    gateway
      .query({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET
      })
      .url(token)
      .post(body)
      .json(),

  getCampaigns: (body) => gateway.url(campaigns).post(body).json()
});

export const useActionCreators = (): {
  actionCreators: ActionCreators;
  headers: Record<string, string>;
} => {
  const authHeaders: { [key: string]: string } = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const defaultHeaders: { [key: string]: string } = {
    // 'Session-Id': getCookie('sessionId'),
    'X-Api-Key': process.env.REACT_APP_X_API_KEY || '',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('accessToken')}` || ``
  };

  const headers = !getCookie('accessToken') ? authHeaders : defaultHeaders;

  const gateway = wretch().headers(headers);

  const actionCreators = getActionCreators(gateway);

  return { actionCreators, headers };
};
