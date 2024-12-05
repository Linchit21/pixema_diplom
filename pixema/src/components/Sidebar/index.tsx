import { SidebarNavigation } from "@/components/Sidebar/constants";
import styles from "./index.module.scss";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}></div>
      <ul className={styles.sidebar__nav}>
        {SidebarNavigation.map((item, index) => {
          return (
            <li key={index} className={styles.sidebar__item}>
              <img
                className={styles["sidebar__item-icon"]}
                src={item.icon}
                alt={item.title}
              />
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
