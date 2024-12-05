import { Container } from "@components/Container";
import { Main } from "@components/Main";
import { MovieList } from "@/components/MovieList";
import { Sidebar } from "@/components/Sidebar";

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <Main>
        <MovieList />
      </Main>
    </Container>
  );
}
