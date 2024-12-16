import {
  requestAuthActivation,
  requestGetUser,
  requestRefreshAccessToken,
  requestSignIn,
  requestSignUp,
} from '@/services/auth';
import { jwt } from '@/utils/jwt';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthProfile {
  id: number;
  userename: string;
  email: string;
  course_group: number;
}

export interface IJwt {
  access: string;
  refresh: string;
}

export interface IUser {
  username: string;
  id: number;
  email: string;
}

export interface AuthState {
  profile: IAuthProfile | null;
  user: IUser | null;
  isLoaded: boolean;
  error: string | null;
  isActivated: boolean;
  jwt: IJwt | null;
}

const initialState: AuthState = {
  profile: null,
  user: null,
  isLoaded: false,
  error: null,
  isActivated: false,
  jwt: jwt.getFromLocalStorage() || null,
};

export const fetchSignUpThunk = createAsyncThunk(
  'auth/fetchSignUpThunk',
  async (body) => {
    const data = await requestSignUp(body);

    return data;
  }
);

export const fetchAuthActivationThunk = createAsyncThunk(
  'auth/fetchAuthActivationThunk',
  async (body) => {
    const data = await requestAuthActivation(body);

    return data;
  }
);

export const fetchSignInThunk = createAsyncThunk(
  'auth/fetchSignInThunk',
  async (body) => {
    const data = await requestSignIn(body);

    // Запись токена при запросе
    jwt.setToLocalStorage(data);

    return data;
  }
);

export const fetchGetCurrentUserThunk = createAsyncThunk(
  'auth/fetchGetCurrentUserThunk',
  async (body) => {
    const data = await requestGetUser(body);

    return data;
  }
);

export const fetchRefreshAccessTokenThunk = createAsyncThunk(
  'auth/fetchRefreshAccessTokenThunk',
  async (body, { getState }) => {
    const data = await requestRefreshAccessToken(body);

    const currentJwt = getState().auth.jwt;
    jwt.setToLocalStorage({ ...currentJwt, access: data });

    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(
        fetchSignUpThunk.fulfilled,
        (state, action: PayloadAction<IAuthProfile>) => {
          state.isLoaded = false;
          state.profile = action.payload;
          console.log(action);
        }
      )
      .addCase(fetchSignUpThunk.rejected, (state, action) => {
        state.isLoaded = false;

        state.error = action.error.message ?? 'Ошибка загрузки';
        console.log(action);
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
        console.log(action);
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
