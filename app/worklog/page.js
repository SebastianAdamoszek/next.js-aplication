import { WorkLogNotebook } from "@/components/WorkLog/WorkLog";
import styles from "../page.module.css";

export default function WorkLogPage() {
  return (
    <div className={styles.main__next}>
      <div className={styles.description}>
        <WorkLogNotebook />
      </div>
    </div>
  );
}
