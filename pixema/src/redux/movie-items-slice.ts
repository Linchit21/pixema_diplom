import {
  requestFilterItems,
  requestMovieItem,
  requestMovieItems,
  requestPremieresItems,
} from '@/services/movieItems';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';

const initialState = {
  value: 0,
  movieItems: [],
  movieItem: {},
  isLoaded: false,
  error: null,

  search: '',
};

// Запрос за постами для HOME
export const fetchMovieItemsThunk = createAsyncThunk(
  'movieItems/fetchMovieItemsThunk',
  async () => {
    const data = await requestMovieItems();

    return data;
  }
);

// Запрос за постами для TRENDS
export const fetchPremieresItemsThunk = createAsyncThunk(
  'movieItems/fetchPremieresItemsThunk',
  async () => {
    const data = await requestPremieresItems();

    return data;
  }
);

// Запрос за постом по ид
export const fetchMovieItemThunk = createAsyncThunk(
  'movieItems/fetchMovieItemThunk',
  async (id) => {
    const data = await requestMovieItem(id);

    return data;
  }
);

// Запрос за постами по фильтру по ид
export const fetchFilterItemsThunk = createAsyncThunk(
  'movieItems/fetchFilterItemsThunk',
  async (searchId) => {
    const data = await requestFilterItems(searchId);

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
      .addCase(fetchPremieresItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchPremieresItemsThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.movieItems = action.payload;
      })
      .addCase(fetchPremieresItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilterItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchFilterItemsThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.movieItems = action.payload;
      })
      .addCase(fetchFilterItemsThunk.rejected, (state, action) => {
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
