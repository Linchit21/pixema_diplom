import styles from "./index.module.scss";

export function MovieItem() {
  return (
    <div className={styles["movie-item"]}>
      <div className={styles["movie-item__img-wrapper"]}>
        <div className={styles["movie-item__rating"]}> 7.6</div>
        <img
          className={styles["movie-item__img"]}
          src="/public/img/mock_movie.png"
          alt="women"
        />
      </div>
      <div className={styles["movie-item__title"]}>Wonder Woman: 1984</div>
      <div className={styles["movie-item__tags"]}>
        <div className={styles["movie-item__tag"]}>Adventure</div>
        <div className={styles["movie-item__tag"]}>Action</div>
        <div className={styles["movie-item__tag"]}>Fantasy</div>
      </div>
    </div>
  );
}
