import { IRequestRefreshAccessTokenResponse } from '@/services/auth';
import { jwtDecode } from 'jwt-decode';

export const jwt = {
  _jwtKey: 'jwt',

  setToLocalStorage(tokens: IRequestRefreshAccessTokenResponse) {
    const json = JSON.stringify(tokens);
    localStorage.setItem(this._jwtKey, json);
  },

  getFromLocalStorage() {
    const tokens = localStorage.getItem(this._jwtKey);

    if (!tokens) return null;

    return JSON.parse(tokens);
  },

  isAccessTokenExpired(accessToken: string) {
    const decodedJwt = jwtDecode<{ exp?: number }>(accessToken);

    if (!decodedJwt.exp) {
      return true;
    }

    const now = Date.now() / 1000;

    return now >= decodedJwt.exp;
  },
};
