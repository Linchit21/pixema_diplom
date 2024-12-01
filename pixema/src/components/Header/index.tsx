import styles from "./index.module.scss";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles["header__form-wrapper"]}>
        <form action="">
          <input
            className={styles.header__search}
            type="text"
            placeholder="Search"
            id=""
          />
        </form>
      </div>
      <div>{/* TODO: User component */}USER</div>
    </div>
  );
}
