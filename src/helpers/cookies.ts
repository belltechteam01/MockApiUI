import Cookies from 'universal-cookie';
import moment from 'moment';

export const getCookie = (name: string): string | undefined => {
  const cookies = new Cookies();
  return cookies.get(name);
};

export const setCookie = (name: string, value: string | undefined): void => {
  const cookies = new Cookies();
  cookies.set(name, value, {
    expires: new Date(moment().add(30, 'm').format())
  });
};
