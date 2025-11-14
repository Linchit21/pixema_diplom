import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export const fetchSignInThunk = createAsyncThunk<
  User,
  { email: string; password: string }
>('auth/fetchSignInThunk', async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
});

export const fetchSignUpThunk = createAsyncThunk<
  User,
  { email: string; password: string }
>('auth/fetchSignUpThunk', async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
});

export const fetchSignOutThunk = createAsyncThunk<void, void>(
  'auth/fetchSignOutThunk',
  async () => {
    await signOut(auth);
  }
);

export interface AuthState {
  user: User | undefined;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = undefined;
      fetchSignOutThunk();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logOut, setUser } = authSlice.actions;
