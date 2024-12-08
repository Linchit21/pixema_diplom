import { requestMovieItems } from '@/services/movieItems';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';

const initialState = {
  value: 0,
  movieItems: [],
  isLoaded: false,
  error: null,

  search: 'wars',
};

export const fetchMovieItemsThunk = createAsyncThunk(
  'movieItems/fetchMovieItemsThunk',
  async (search) => {
    const data = await requestMovieItems(search);

    return data;
  }
);

export const movieItemsSlice = createSlice({
  name: 'movieItems',
  initialState,
  reducers: {
    searchItems: (state, action) => {
      state.search = action.payload;
    },
  },
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

export const { searchItems } = movieItemsSlice.actions;
export const movieItemsReducer = movieItemsSlice.reducer;
