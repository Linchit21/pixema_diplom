import { ISearchFilterFormValues } from '@/components/SearchFilter/type';
import {
  IRequestFilterItemsResponse,
  IRequestPremieresItemsParams,
  IRequestPremieresItemsResponse,
  requestFilterItems,
  requestMovieItem,
  requestMovieSimilaryItems,
  requestPremieresItems,
} from '@/services/movieItems';
import { IMovieArticle } from '@/types/movie/movie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';
import { RootState } from './store';
import { localStorageService } from '@/utils/localStorage';

export interface MovieItemsState {
  page: number;
  total: number;
  movieItems: IMovieArticle[];
  movieItem: IMovieArticle | null;
  favoriteItems: IMovieArticle[];
  isLoaded: boolean;
  error: string | null;
  search: ISearchFilterFormValues;
  burger: boolean;
}

const initialState: MovieItemsState = {
  page: 1,
  total: 0,
  movieItems: [],
  movieItem: null,
  favoriteItems: localStorageService.get<IMovieArticle[]>('favorites') || [],
  isLoaded: false,
  error: null,
  search: {},
  burger: false,
};

// Запрос за постами для TRENDS
export const fetchPremieresItemsThunk = createAsyncThunk<
  IRequestPremieresItemsResponse,
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
  IRequestFilterItemsResponse,
  ISearchFilterFormValues | undefined
>('movieItems/fetchFilterItemsThunk', async (params, { getState }) => {
  const page = (getState as () => RootState)().movieItems.page;

  const search = (getState as () => RootState)().movieItems.search;

  const data = await requestFilterItems({ ...search, ...params, page });

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

      const json = JSON.stringify(favoriteData);
      localStorage.setItem('favorites', json);

      state.favoriteItems = [...favoriteData];
    },
    resetMovieItems: (state) => {
      state.page = 1;
      state.total = 0;
      state.search = {};
      state.movieItems = [];
    },
    resetMovieItem: (state) => {
      state.movieItem = null;
    },
    setFavoritesItems: (state) => {
      state.movieItems = [...state.favoriteItems];
      state.total = state.favoriteItems.length;
    },
    searchFilters: (state, action) => {
      state.search = { ...state.search, ...action.payload };
      state.page = 1;
      state.total = 0;
      state.movieItems = [];
    },
    setBurger: (state, action) => {
      state.burger = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        console.log(action);
        state.total = action.payload.total;
        state.isLoaded = false;
        state.movieItems = [...state.movieItems, ...action.payload.items];
        state.page += 1;
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

export const {
  favorite,
  resetMovieItems,
  resetMovieItem,
  setFavoritesItems,
  searchFilters,
  setBurger,
} = movieItemsSlice.actions;
export const movieItemsReducer = movieItemsSlice.reducer;
