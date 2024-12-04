import { Container } from "./Container";
import { Header } from "@components/Header";
import { Main } from "@components/Main";
import { Footer } from "./Footer";
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
