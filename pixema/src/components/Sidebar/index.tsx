import { SidebarNavigation } from "@/components/Sidebar/constants";
import styles from "./index.module.scss";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}></div>
      <ul className={styles.sidebar__nav}>
        {SidebarNavigation.map((item) => {
          return (
            <li className={styles.sidebar__item}>
              <span className={styles["sidebar__item-icon"]}>{item.icon}</span>
              <span className={styles["sidebar__item-title"]}>
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
      <div className={styles.sidebar__footer}>© All Rights Reserved</div>
    </div>
  );
}
