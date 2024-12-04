import { MovieItem } from "@/components/MovieItem";
import styles from "./index.module.scss";

export function MovieList() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={styles["movie-list__wrapper"]}>
      <div className={styles["movie-list"]}>
        {arr.map((item) => {
          return <MovieItem key={item} />;
        })}
      </div>
      <button className={styles["movie-list__button"]} type="button">
        Show more
      </button>
    </div>
  );
}
