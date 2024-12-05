import { requestMovieItems } from '@/services/movieItems';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';

const initialState = {
  value: 0,
  movieItems: [],
  isLoaded: false,
  error: null,
};

export const fetchMovieItemsThunk = createAsyncThunk(
  'movieItems/fetchMovieItemsThunk',
  async () => {
    const data = await requestMovieItems();

    return data;
  }
);

export const movieItemsSlice = createSlice({
  name: 'movieItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchMovieItemsThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.movieItems = action.payload;
      })
      .addCase(fetchMovieItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message;
      });
  },
});

export const movieItemsReducer = movieItemsSlice.reducer;
