import { Balance } from "@/components/Finance/Balance/Balance";
import { Income } from "@/components/Finance/Income/Income";
import styles from "@/app/page.module.css";

export default function IncomePage() {
  return (
    <div className={styles.main__next}>
      <div className={styles.description}>
        <Balance />
        <Income />
      </div>
    </div>
  );
}
