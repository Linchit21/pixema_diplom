import { Header } from "@/components/Header";
import styles from "./index.module.scss";

export function Main(props) {
  return (
    <div className={styles.main}>
      <Header />
      {props.children}
    </div>
  );
}
