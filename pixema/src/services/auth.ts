import {
  authActivationEndpoint,
  refreshAccessTokenEndpoint,
  setPasswordEndpoint,
  signInEndpoint,
  signUpEndpoint,
  usernameEndpoint,
} from '@/config/api-auth';
import { clientAuth } from '@/utils/client';

export interface IRequestSignUpParams {
  username: string;
  password: number;
  email: string;

  /**id для запроса */
  course_group?: number;
}

export interface IRequestSignUpResponse {
  id: number;
  userename: string;
  email: string;
  course_group: number;
}

export const requestSignUp = async (params: IRequestSignUpParams) => {
  const response = await clientAuth.post<IRequestSignUpResponse>(
    signUpEndpoint,
    {
      ...params,
      course_group: 13, // номер моей группы
    }
  );

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

export interface IRequestSignInResponse {
  access: string;
  refresh: string;
}

export const requestSignIn = async (body: IRequestSignInBody) => {
  const response = await clientAuth.post<IRequestSignInResponse>(
    signInEndpoint,
    { ...body }
  );

  return response.data;
};

export interface IRequestGetUserResponse {
  username: string;
  id: number;
  email: string;
}

export const requestGetUser = async (body: string) => {
  const response = await clientAuth.get<IRequestGetUserResponse>(
    usernameEndpoint,
    {
      headers: { Authorization: `Bearer ${body}` },
    }
  );

  return response.data;
};

export interface IRequestRefreshAccessTokenBody {
  refresh: string;
}

export interface IRequestRefreshAccessTokenResponse {
  access: string;
}

export const requestRefreshAccessToken = async (
  refresh: IRequestRefreshAccessTokenBody
) => {
  const response = await clientAuth.post<IRequestRefreshAccessTokenResponse>(
    refreshAccessTokenEndpoint,
    {
      refresh,
    }
  );

  return response.data;
};

export interface IRequestSetPasswordBody {
  ['current_password']: string;
  ['new_password']: string;
}

export interface IRequestSetPasswordResponse {
  access: string;
}

export const requestSetPassword = async (body: IRequestSetPasswordBody) => {
  const response = await clientAuth.post<IRequestSetPasswordResponse>(
    setPasswordEndpoint,
    {
      ...body,
    }
  );

  return response.data;
};
