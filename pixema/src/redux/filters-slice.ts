import { requestFilters } from '@/services/filters';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: [],
  countries: [],
};

// получение списка фильтров и стран
export const fetchFiltersThunk = createAsyncThunk(
  'filters/fetchFiltersThunk',
  async () => {
    const data = await requestFilters();

    return data;
  }
);

export const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersThunk.pending, (state) => {
        // state.isLoaded = true;
        // state.error = null;
      })
      .addCase(fetchFiltersThunk.fulfilled, (state, action) => {
        // state.isLoaded = false;
        state.genres = action.payload.genres;
        state.countries = action.payload.countries;
      })
      .addCase(fetchFiltersThunk.rejected, (state, action) => {
        // state.isLoaded = false;
        // state.error = action.error.message;
      });
  },
});

export const filtersReducer = filtersSlice.reducer;
