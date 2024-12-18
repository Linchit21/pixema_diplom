import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from '@/pages/Home';
import { Trends } from '@/pages/Trends';
import { SearchResult } from '@/pages/SearchResult';
import { Favorites } from '@/pages/Favorites';
import { SignInForm } from '@/components/SignInForm';
import { SignUpForm } from '@/components/SignUpForm';
import { RegistrationConfirm } from '@/components/RegistrationConfirm';
import { AuthActivation } from '@/pages/AuthActivation';
import { Movie } from './pages/Movie';

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
        element: <Movie />,
      },
      {
        path: '/search/:searchId',
        element: <SearchResult />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/auth/sign-in',
        element: <SignInForm />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUpForm />,
      },
      {
        path: '/auth/activation/',
        element: <RegistrationConfirm />,
      },
      {
        path: '/auth/activation/:uid/:token',
        element: <AuthActivation />,
      },
    ],
  },
]);
