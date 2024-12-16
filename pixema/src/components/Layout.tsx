import { Container } from '@components/Container';
import { Main } from '@components/Main';
import { MovieList } from '@/components/MovieList';
import { Sidebar } from '@/components/Sidebar';
import { Outlet } from 'react-router';
import { SignUpForm } from './SignUpForm';
import { SignInForm } from './SignInForm';
import { RegistrationConfirm } from './RegistrationConfirm';

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <Main>
        <Outlet />
        {/* <RegistrationConfirm /> */}
        {/* <SignUpForm /> */}
        {/* <SignInForm /> */}
      </Main>
    </Container>
  );
}
