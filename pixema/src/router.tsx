import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from '@/pages/Home';
import { Trends } from '@/pages/Trends';
import { MovieId } from '@/components/MovieId';

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
    ],
  },
]);
