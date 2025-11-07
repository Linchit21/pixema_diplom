import {
  IRequestGetUserResponse,
  IRequestSignUpResponse,
} from '@/services/auth';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export const fetchSignInThunk = createAsyncThunk<User, { email: string; password: string }>(
  'auth/fetchSignInThunk',
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const fetchSignUpThunk = createAsyncThunk<User, { email: string; password: string }>(
  'auth/fetchSignUpThunk',
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const fetchSignOutThunk = createAsyncThunk<void, void>(
  'auth/fetchSignOutThunk',
  async () => {
    await signOut(auth);
  }
);

export interface AuthState {
  profile: IRequestSignUpResponse | null;
  user: IRequestGetUserResponse | null;
  isLoaded: boolean;
  error: string | null;
  isActivated: boolean;
}

const initialState: AuthState = {
  profile: null,
  user: null,
  isLoaded: false,
  error: null,
  isActivated: false,
};

// export const fetchSignUpThunk = createAsyncThunk<
//   IRequestSignUpResponse,
//   IRequestSignUpParams
// >('auth/fetchSignUpThunk', async (body) => {
//   const data = await requestSignUp(body);

//   return data;
// });

// export const fetchAuthActivationThunk = createAsyncThunk<
//   string,
//   IRequestAuthActivationBody
// >('auth/fetchAuthActivationThunk', async (body) => {
//   const data = await requestAuthActivation(body);

//   return data;
// });

// export interface FetchSignInThunkPayload {
//   body: IRequestSignInBody;
//   successCallback: () => void;
// }

// export const fetchSignInThunk = createAsyncThunk<
//   IRequestSignInResponse,
//   FetchSignInThunkPayload
// >('auth/fetchSignInThunk', async (payload) => {
//   const data = await requestSignIn(payload.body);

//   // Запись токена при запросе
//   jwt.setToLocalStorage(data);

//   return data;
// });

// export const fetchGetCurrentUserThunk = createAsyncThunk<
//   IRequestGetUserResponse,
//   string
// >('auth/fetchGetCurrentUserThunk', async (body) => {
//   const data = await requestGetUser(body);

//   return data;
// });

// export const fetchRefreshAccessTokenThunk = createAsyncThunk<
//   string,
//   IRequestRefreshAccessTokenBody
// >('auth/fetchRefreshAccessTokenThunk', async (body, { getState }) => {
//   const data = await requestRefreshAccessToken(body);

//   const currentJwt = (getState as () => RootState)().auth.jwt;
//   jwt.setToLocalStorage({ ...currentJwt, access: data });

//   return data;
// });

// export const fetchSetPasswordThunk = createAsyncThunk<
//   IRequestSetPasswordResponse,
//   IRequestSetPasswordBody
// >('auth/fetchRefreshAccessTokenThunk', async (body) => {
//   const data = await requestSetPassword(body);

//   return data;
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      fetchSignOutThunk();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchSignUpThunk.pending, (state) => {
  //       state.isLoaded = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchSignUpThunk.fulfilled, (state, action) => {
  //       state.isLoaded = false;
  //       state.profile = action.payload;
  //     })
  //     .addCase(fetchSignUpThunk.rejected, (state, action) => {
  //       state.isLoaded = false;

  //       state.error = action.error.message ?? 'Ошибка загрузки';
  //     })
  //     .addCase(fetchAuthActivationThunk.pending, (state) => {
  //       state.isLoaded = true;
  //       state.error = null;
  //       state.isActivated = false;
  //     })
  //     .addCase(fetchAuthActivationThunk.fulfilled, (state) => {
  //       state.isLoaded = false;
  //       state.isActivated = true;
  //     })
  //     .addCase(fetchAuthActivationThunk.rejected, (state, action) => {
  //       state.isLoaded = false;
  //       state.error = action.error.message ?? 'Ошибка загрузки';
  //     })
  //     .addCase(fetchSignInThunk.pending, (state) => {
  //       state.isLoaded = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchSignInThunk.fulfilled, (state, action) => {
  //       state.isLoaded = false;
  //       state.jwt = action.payload;
  //       action.meta.arg.successCallback();
  //     })
  //     .addCase(fetchSignInThunk.rejected, (state, action) => {
  //       state.isLoaded = false;
  //       state.error = action.error.message ?? 'Ошибка загрузки';
  //     })
  //     .addCase(fetchGetCurrentUserThunk.pending, (state) => {
  //       state.isLoaded = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchGetCurrentUserThunk.fulfilled, (state, action) => {
  //       state.isLoaded = false;
  //       state.user = action.payload;
  //     })
  //     .addCase(fetchGetCurrentUserThunk.rejected, (state, action) => {
  //       state.isLoaded = false;
  //       state.error = action.error.message ?? 'Ошибка загрузки';
  //     })
  //     .addCase(fetchSetPasswordThunk.pending, (state) => {
  //       state.error = null;
  //     })
  //     .addCase(fetchSetPasswordThunk.rejected, (state, action) => {
  //       state.error = action.error.message ?? 'Ошибка загрузки';
  //     });
  // },
});

export const authReducer = authSlice.reducer;
export const { logOut, setUser } = authSlice.actions;
