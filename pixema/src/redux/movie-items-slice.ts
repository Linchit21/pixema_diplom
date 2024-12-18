import { ISearchFilterFormValues } from '@/components/SearchFilter/type';
import {
  IRequestMovieItemsParams,
  IRequestPremieresItemsParams,
  requestFilterItems,
  requestMovieItem,
  requestMovieItems,
  requestMovieSimilaryItems,
  requestPremieresItems,
} from '@/services/movieItems';
import { IMovieArticle, IMovieItem } from '@/types/movie/movie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';
import { RootState } from './store';

export interface MovieItemsState {
  page: number;
  total: number;
  movieItems: IMovieArticle[];
  movieItem: IMovieArticle | null;
  favoriteItems: IMovieArticle[];
  isLoaded: boolean;
  error: string | null;
}

const initialState: MovieItemsState = {
  page: 1,
  total: 0,
  movieItems: [],
  movieItem: null,
  favoriteItems: [],
  isLoaded: false,
  error: null,
};

// Запрос за постами для HOME
export const fetchMovieItemsThunk = createAsyncThunk<
  IMovieItem,
  IRequestMovieItemsParams
>('movieItems/fetchMovieItemsThunk', async (params, { getState }) => {
  const page = (getState as () => RootState)().movieItems.page;

  const data = await requestMovieItems({ ...params, page });

  return data;
});

// Запрос за постами для TRENDS
export const fetchPremieresItemsThunk = createAsyncThunk<
  IMovieItem,
  IRequestPremieresItemsParams
>('movieItems/fetchPremieresItemsThunk', async (params, { getState }) => {
  const page = (getState as () => RootState)().movieItems.page;

  const data = await requestPremieresItems({ ...params, page });

  return data;
});

// Запрос за постом по ид
export const fetchMovieItemThunk = createAsyncThunk<IMovieArticle, string>(
  'movieItems/fetchMovieItemThunk',
  async (id) => {
    const data = await requestMovieItem(id);

    return data;
  }
);

// Запрос за постами по фильтру по ид
export const fetchFilterItemsThunk = createAsyncThunk<
  IMovieItem,
  ISearchFilterFormValues
>('movieItems/fetchFilterItemsThunk', async (body) => {
  const data = await requestFilterItems(body);

  return data;
});

// Запрос за похожими фильмами по ид
export const fetcMovieSimialryItemsThunk = createAsyncThunk<
  IMovieArticle[],
  string
>('movieItems/fetcMovieSimialryItemsThunk', async (id: string) => {
  const data = await requestMovieSimilaryItems(id);

  return data;
});

export const movieItemsSlice = createSlice({
  name: 'movieItems',
  initialState,
  reducers: {
    favorite: (state, action) => {
      const favoriteData = [...state.favoriteItems];
      const findIndex = favoriteData.findIndex(
        (item) => item.kinopoiskId == action.payload.kinopoiskId
      );

      if (findIndex === -1) {
        favoriteData.push(action.payload);
      } else {
        favoriteData.splice(findIndex, 1);
      }

      state.favoriteItems = [...favoriteData];
      console.log(state.favoriteItems);
    },
    resetMovieItems: (state) => {
      state.page = 1;
      state.total = 0;
      state.movieItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchMovieItemsThunk.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.isLoaded = false;
        state.movieItems = [...state.movieItems, ...action.payload.items];
        state.page += 1;
      })
      .addCase(fetchMovieItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchPremieresItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchPremieresItemsThunk.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.isLoaded = false;
        state.movieItems = [...state.movieItems, ...action.payload.items];
        state.page += 1;
      })
      .addCase(fetchPremieresItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetchFilterItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchFilterItemsThunk.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.isLoaded = false;
        state.movieItems = action.payload.items;
      })
      .addCase(fetchFilterItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
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
        state.error = action.error.message ?? 'Ошибка загрузки';
      })
      .addCase(fetcMovieSimialryItemsThunk.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetcMovieSimialryItemsThunk.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.movieItems = action.payload;
      })
      .addCase(fetcMovieSimialryItemsThunk.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      });
  },
});

export const { favorite, resetMovieItems } = movieItemsSlice.actions;
export const movieItemsReducer = movieItemsSlice.reducer;
