import {
  authActivationEndpoint,
  refreshAccessTokenEndpoint,
  signInEndpoint,
  signUpEndpoint,
  usernameEndpoint,
} from '@/config/api';
import { clientAuth } from '@/utils/client';

export interface IRequestSignUpParams {
  userename: string;
  password: number;
  email: string;
  course_group: number;
}

export const requestSignUp = async (params: IRequestSignUpParams) => {
  const response = await clientAuth.post(signUpEndpoint, {
    ...params,
    course_group: 13,
  });

  return response.data;
};

export interface IRequestAuthActivationBody {
  uid: string;
  token: string;
}

export const requestAuthActivation = async (
  body: IRequestAuthActivationBody
) => {
  const response = await clientAuth.post(authActivationEndpoint, { ...body });

  return response.data;
};

export interface IRequestSignInBody {
  email: string;
  password: string;
}

export const requestSignIn = async (body: IRequestSignInBody) => {
  const response = await clientAuth.post(signInEndpoint, { ...body });

  return response.data;
};

export const requestGetUser = async (body: string) => {
  const response = await clientAuth.get(usernameEndpoint, {
    headers: { Authorization: `Bearer ${body}` },
  });

  return response.data;
};

export interface IRequestRefreshAccessTokenBody {
  refresh: string;
}

export const requestRefreshAccessToken = async (
  refresh: IRequestRefreshAccessTokenBody
) => {
  const response = await clientAuth.post(refreshAccessTokenEndpoint, {
    refresh,
  });

  return response.data.access;
};
