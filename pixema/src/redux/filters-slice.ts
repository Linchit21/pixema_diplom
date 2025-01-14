import { IRequestFiltersResponse, requestFilters } from '@/services/filters';
import { IFiltersCountries, IFiltersGenres } from '@/types/filters/filters';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  genres: IFiltersGenres[];
  countries: IFiltersCountries[];
}

const initialState: FiltersState = {
  genres: [],
  countries: [],
};

// получение списка фильтров и стран
export const fetchFiltersThunk = createAsyncThunk<IRequestFiltersResponse>(
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
    builder.addCase(
      fetchFiltersThunk.fulfilled,
      (state, action: PayloadAction<IRequestFiltersResponse>) => {
        state.genres = action.payload.genres;
        state.countries = action.payload.countries;
      }
    );
  },
});

export const filtersReducer = filtersSlice.reducer;
