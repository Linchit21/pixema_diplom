import styles from "./index.module.scss";

export function Container(props) {
  return <div className={styles.container}>{props.children}</div>;
}
