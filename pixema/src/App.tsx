import { Layout } from '@components/Layout';
import '@styles/app.scss';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
