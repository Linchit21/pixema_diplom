import { IMovie } from "@/types/movie";
import styles from "./index.module.scss";

interface MovieItemProps {
  movieData: IMovie;
}

export function MovieItem(props: MovieItemProps) {
  const {
    movieData: { name, genres, rating, poster },
  } = props;

  return (
    <div className={styles["movie-item"]}>
      <div className={styles["movie-item__img-wrapper"]}>
        <div className={styles["movie-item__rating"]}>
          {rating.kp || rating.imdb}
        </div>
        <img
          className={styles["movie-item__img"]}
          src={poster?.previewUrl}
          alt="women"
        />
      </div>
      <div className={styles["movie-item__title"]}>{name}</div>
      <div className={styles["movie-item__tags"]}>
        {genres.map((item, index) => {
          return (
            <div key={index} className={styles["movie-item__tag"]}>
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
