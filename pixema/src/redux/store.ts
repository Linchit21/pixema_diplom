import { configureStore } from '@reduxjs/toolkit';
import { movieItemsReducer } from '@/redux/movie-items-slice';

const loggerMiddleware = (store) => (next) => (action) => {
  console.log(action.type);

  // переход к следющему мидлу по цепочке
  return next(action);
};

const arrMiddleware = [loggerMiddleware];

export const store = configureStore({
  reducer: {
    movieItems: movieItemsReducer,
  },

  // для работы расширения в браузере
  devTools: true,

  // конкатенация к уже имеющимся мидлам
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(arrMiddleware),
});
