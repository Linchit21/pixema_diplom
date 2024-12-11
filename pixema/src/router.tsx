import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from '@/pages/Home';
import { Trends } from '@/pages/Trends';
import { MovieId } from '@/components/MovieId';
import { SearchResult } from '@/pages/SearchResult';
import { Favorites } from './pages/Favorites';

export const router = createBrowserRouter([
  {
    // Метод Outlet router react dom
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/trends',
        element: <Trends />,
      },
      {
        path: '/movie/:movieId',
        element: <MovieId />,
      },
      {
        path: '/search/:searchId',
        element: <SearchResult />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
    ],
  },
]);
