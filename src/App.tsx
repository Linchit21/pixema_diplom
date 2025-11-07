import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { RouterProvider } from 'react-router';
import { router } from '@/router';

import '@styles/app.scss';

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
