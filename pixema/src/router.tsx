import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from '@/pages/Home';
import { Trends } from '@/pages/Trends';
import { Favorites } from '@/pages/Favorites';
import { SignInForm } from '@/components/SignInForm';
import { SignUpForm } from '@/components/SignUpForm';
import { AuthActivation } from '@/pages/AuthActivation';
import { Movie } from './pages/Movie';
import { UnauthorizedLayout } from './components/UnauthorizedLayout';
import { Settings } from './pages/Settings';
import { RegistrationConfirm } from './components/RegistrationConfirm';
import { ResultSearch } from './pages/ResultSearch';

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
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/search/:keyword',
        element: <ResultSearch />,
      },

      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    element: <UnauthorizedLayout />,
    children: [
      {
        path: '/auth/sign-in',
        element: <SignInForm />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUpForm />,
      },
      {
        path: '/auth/activation/:uid/:token',
        element: <AuthActivation />,
      },
      {
        path: '/auth/email',
        element: <RegistrationConfirm />,
      },
    ],
  },
]);
