import { requestFilters } from '@/services/filters';
import { IFiltersCountries, IFiltersGenres } from '@/types/filters/filters';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  genres: IFiltersGenres[];
  countries: IFiltersCountries[];
}

interface FetchFilter {
  genres: IFiltersGenres[];
  countries: IFiltersCountries[];
}

const initialState: FiltersState = {
  genres: [],
  countries: [],
};

// получение списка фильтров и стран
export const fetchFiltersThunk = createAsyncThunk<FetchFilter>(
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
      // .addCase(fetchFiltersThunk.pending, (state) => {

      // })
      .addCase(
        fetchFiltersThunk.fulfilled,
        (state, action: PayloadAction<FetchFilter>) => {
          state.genres = action.payload.genres;
          state.countries = action.payload.countries;
        }
      );
    // .addCase(fetchFiltersThunk.rejected, (state, action) => {
    //   // state.isLoaded = false;
    //   // state.error = action.error.message;
    // });
  },
});

export const filtersReducer = filtersSlice.reducer;
