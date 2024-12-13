import {
  requestFilterItems,
  requestMovieItem,
  requestMovieItems,
  requestPremieresItems,
} from '@/services/movieItems';
import { IMovieItem } from '@/types/movie/movie';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit/react';

export interface MovieItemsState {
  value: number;
  movieItems: IMovieItem[];
  movieItem: IMovieItem | null;
  favoriteItems: IMovieItem[];
  isLoaded: boolean;
  error: string | null;
}

const initialState: MovieItemsState = {
  value: 0,
  movieItems: [],
  movieItem: null,
  favoriteItems: [],
  isLoaded: false,
  error: null,
};

// Запрос за постами для HOME
export const fetchMovieItemsThunk = createAsyncThunk<IMovieItem[]>(
  'movieItems/fetchMovieItemsThunk',
  async () => {
    const data = await requestMovieItems();

    return data;
  }
);

// Запрос за постами для TRENDS
export const fetchPremieresItemsThunk = createAsyncThunk<IMovieItem[]>(
  'movieItems/fetchPremieresItemsThunk',
  async () => {
    const data = await requestPremieresItems();

    return data;
  }
);

// Запрос за постом по ид
export const fetchMovieItemThunk = createAsyncThunk<IMovieItem, string>(
  'movieItems/fetchMovieItemThunk',
  async (id) => {
    const data = await requestMovieItem(id);

    return data;
  }
);

// Запрос за постами по фильтру по ид
export const fetchFilterItemsThunk = createAsyncThunk<IMovieItem[], number>(
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
    favorite: (state, action: PayloadAction<IMovieItem>) => {
      const favoriteData = state.favoriteItems;
      const findIndex = favoriteData.findIndex(
        (item) => item.kinopoiskId == action.payload.kinopoiskId
      );

      if (findIndex === -1) {
        favoriteData.push(action.payload);
      } else {
        favoriteData.splice(findIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(
        fetchMovieItemsThunk.fulfilled,
        (state, action: PayloadAction<IMovieItem[]>) => {
          state.isLoaded = false;
          state.movieItems = action.payload;
        }
      )
      .addCase(fetchMovieItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchPremieresItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(
        fetchPremieresItemsThunk.fulfilled,
        (state, action: PayloadAction<IMovieItem[]>) => {
          state.isLoaded = false;
          state.movieItems = action.payload;
        }
      )
      .addCase(fetchPremieresItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchFilterItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(
        fetchFilterItemsThunk.fulfilled,
        (state, action: PayloadAction<IMovieItem[]>) => {
          state.isLoaded = false;
          state.movieItems = action.payload;
        }
      )
      .addCase(fetchFilterItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchMovieItemThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(
        fetchMovieItemThunk.fulfilled,
        (state, action: PayloadAction<IMovieItem>) => {
          state.isLoaded = false;
          state.movieItem = action.payload;
        }
      )
      .addCase(fetchMovieItemThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      });
  },
});

export const { favorite } = movieItemsSlice.actions;
export const movieItemsReducer = movieItemsSlice.reducer;
