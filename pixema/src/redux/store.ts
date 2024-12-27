import { configureStore } from '@reduxjs/toolkit';
import { movieItemsReducer, MovieItemsState } from '@/redux/movie-items-slice';
import { filtersReducer, FiltersState } from './filters-slice';
import { authReducer, AuthState } from './auth-slice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    movieItems: movieItemsReducer,
    auth: authReducer,
  },

  // для работы расширения в браузере
  devTools: true,
});

export type RootState = {
  filters: FiltersState;
  movieItems: MovieItemsState;
  auth: AuthState;
};

export type AppDispatch = typeof store.dispatch;
