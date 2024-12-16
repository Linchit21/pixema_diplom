import { configureStore } from '@reduxjs/toolkit';
import { movieItemsReducer, MovieItemsState } from '@/redux/movie-items-slice';
import { filtersReducer, FiltersState } from './filters-slice';
import { authReducer, AuthState } from './auth-slice';

// const loggerMiddleware: Middleware = () => (next) => (action) => {
//   console.log(action.type);

//   // переход к следющему мидлу по цепочке
//   return next(action);
// };

// const arrMiddleware: Middleware[] = [loggerMiddleware];

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    movieItems: movieItemsReducer,
    auth: authReducer,
  },

  // для работы расширения в браузере
  devTools: true,

  // конкатенация к уже имеющимся мидлам
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(arrMiddleware),
});

export type RootState = {
  filters: FiltersState;
  movieItems: MovieItemsState;
  auth: AuthState;
};

export type AppDispatch = typeof store.dispatch;
