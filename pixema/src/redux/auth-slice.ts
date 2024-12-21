import {
  IRequestAuthActivationBody,
  IRequestRefreshAccessTokenBody,
  IRequestSignInBody,
  IRequestSignUpParams,
  requestAuthActivation,
  requestGetUser,
  requestRefreshAccessToken,
  requestSignIn,
  requestSignUp,
} from '@/services/auth';
import {
  IAuthJwt,
  IAuthRefresh,
  IAuthSignUp,
  IAuthUser,
} from '@/types/auth/auth';
import { jwt } from '@/utils/jwt';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AuthState {
  profile: IAuthSignUp | null;
  user: IAuthUser | null;
  isLoaded: boolean;
  error: string | null;
  isActivated: boolean;
  jwt: IAuthJwt | null;
}

const initialState: AuthState = {
  profile: null,
  user: null,
  isLoaded: false,
  error: null,
  isActivated: false,
  jwt: jwt.getFromLocalStorage() || null,
};

export const fetchSignUpThunk = createAsyncThunk<
  IAuthSignUp,
  IRequestSignUpParams
>('auth/fetchSignUpThunk', async (body) => {
  const data = await requestSignUp(body);

  return data;
});

export const fetchAuthActivationThunk = createAsyncThunk<
  string,
  IRequestAuthActivationBody
>('auth/fetchAuthActivationThunk', async (body) => {
  const data = await requestAuthActivation(body);

  return data;
});

export const fetchSignInThunk = createAsyncThunk<IAuthJwt, IRequestSignInBody>(
  'auth/fetchSignInThunk',
  async (body) => {
    const data = await requestSignIn(body);

    // Запись токена при запросе
    jwt.setToLocalStorage(data);

    return data;
  }
);

export const fetchGetCurrentUserThunk = createAsyncThunk<IAuthUser, string>(
  'auth/fetchGetCurrentUserThunk',
  async (body) => {
    const data = await requestGetUser(body);

    return data;
  }
);

export const fetchRefreshAccessTokenThunk = createAsyncThunk<
  IAuthRefresh,
  IRequestRefreshAccessTokenBody
>('auth/fetchRefreshAccessTokenThunk', async (body, { getState }) => {
  const data = await requestRefreshAccessToken(body);

  const currentJwt = (getState as () => RootState)().auth.jwt;
  jwt.setToLocalStorage({ ...currentJwt, access: data });

  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.jwt = null;
      state.user = null;
      localStorage.removeItem('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchSignUpThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.profile = action.payload;
      })
      .addCase(fetchSignUpThunk.rejected, (state, action) => {
        state.isLoaded = false;

        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchAuthActivationThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
        state.isActivated = false;
      })
      .addCase(fetchAuthActivationThunk.fulfilled, (state) => {
        state.isLoaded = false;
        state.isActivated = true;
      })
      .addCase(fetchAuthActivationThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchSignInThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchSignInThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.jwt = action.payload;
      })
      .addCase(fetchSignInThunk.rejected, (state, action) => {
        state.isLoaded = false;

        state.error = action.error.message ?? 'Ошибка загрузки';
        console.log(action);
      })
      .addCase(fetchGetCurrentUserThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchGetCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.user = action.payload;
      })
      .addCase(fetchGetCurrentUserThunk.rejected, (state, action) => {
        state.isLoaded = false;

        state.error = action.error.message ?? 'Ошибка загрузки';
        console.log(action);
      });
  },
});

export const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
