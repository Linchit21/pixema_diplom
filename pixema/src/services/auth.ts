import {
  authActivationEndpoint,
  refreshAccessTokenEndpoint,
  signInEndpoint,
  signUpEndpoint,
  usernameEndpoint,
} from '@/config/api';
import { clientAuth } from '@/utils/client';

export const requestSignUp = async (body) => {
  const response = await clientAuth.post(signUpEndpoint, {
    ...body,
    course_group: 13,
  });

  return response.data;
};

export const requestAuthActivation = async (body) => {
  const response = await clientAuth.post(authActivationEndpoint, { ...body });

  return response.data;
};

export const requestSignIn = async (body) => {
  const response = await clientAuth.post(signInEndpoint, { ...body });

  return response.data;
};

export const requestGetUser = async (body) => {
  const response = await clientAuth.get(usernameEndpoint, {
    headers: { Authorization: `Bearer ${body}` },
  });

  return response.data;
};

export const requestRefreshAccessToken = async (refresh) => {
  const response = await clientAuth.post(refreshAccessTokenEndpoint, {
    refresh,
  });

  return response.data.access;
};
