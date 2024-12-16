import { jwtDecode } from 'jwt-decode';

export const jwt = {
  _jwtKey: 'jwt',

  setToLocalStorage(tokens) {
    const json = JSON.stringify(tokens);
    console.log('Set to localStorage');
    localStorage.setItem(this._jwtKey, json);
  },

  getFromLocalStorage() {
    const tokens = localStorage.getItem(this._jwtKey);
    console.log('Get to localStorage');

    if (!tokens) return null;

    return JSON.parse(tokens);
  },

  isAccessTokenExpired(accessToken) {
    const decodedJwt = jwtDecode(accessToken);
    const { exp } = decodedJwt;

    const now = Date.now() / 1000;

    return now >= exp;
  },
};
