import styles from "./index.module.scss";

export function User() {
  return (
    <div className={styles.user}>
      <div className={styles.user__initials}>LI</div>
      <div className={styles.user__name}>Linch</div>
      <button className={styles.user__arrow} type="button"></button>
    </div>
  );
}
