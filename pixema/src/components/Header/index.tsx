import { User } from "@/components/User";
import styles from "./index.module.scss";

export function Header() {
  return (
    <div className={styles.header}>
      <form className={styles.header__form}>
        <input
          className={styles.header__search}
          type="text"
          placeholder="Search"
        />
        <button type="button" className={styles.header__filter} />
      </form>
      <User />
    </div>
  );
}
