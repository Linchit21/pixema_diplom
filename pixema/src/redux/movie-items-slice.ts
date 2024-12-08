import { requestMovieItem, requestMovieItems } from '@/services/movieItems';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';

const initialState = {
  value: 0,
  movieItems: [],
  movieItem: {},
  isLoaded: false,
  error: null,

  search: '',
};

export const fetchMovieItemsThunk = createAsyncThunk(
  'movieItems/fetchMovieItemsThunk',
  async (filter) => {
    const data = await requestMovieItems(filter);

    return data;
  }
);

export const fetchMovieItemThunk = createAsyncThunk(
  'movieItems/fetchMovieItemThunk',
  async (id) => {
    const data = await requestMovieItem(id);

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
      })
      .addCase(fetchMovieItemThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchMovieItemThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.movieItem = action.payload;
      })
      .addCase(fetchMovieItemThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message;
      });
  },
});

export const { searchItems } = movieItemsSlice.actions;
export const movieItemsReducer = movieItemsSlice.reducer;
