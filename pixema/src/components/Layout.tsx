import { Container } from '@components/Container';
import { Main } from '@components/Main';
import { MovieList } from '@/components/MovieList';
import { Sidebar } from '@/components/Sidebar';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}
