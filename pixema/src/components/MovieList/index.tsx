import { MovieItem } from "@/components/MovieItem";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { mockGetMovie } from "@/mocks/getMovie";
import { IMovie } from "@/types/movie";

export function MovieList() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const getMovies = async () => {
    setTimeout(() => {
      setMovies(mockGetMovie.docs as IMovie[]);
    }, 1000);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={styles["movie-list__wrapper"]}>
      <div className={styles["movie-list"]}>
        {movies.map((item) => {
          return <MovieItem key={item.id} movieData={item} />;
        })}
      </div>
      <button className={styles["movie-list__button"]} type="button">
        Show more
      </button>
    </div>
  );
}
