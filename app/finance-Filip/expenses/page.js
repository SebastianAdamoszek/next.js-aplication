import { Balance } from "@/components/Finance/Balance/Balance";
import { Expenses } from "@/components/Finance/Expenses/Expenses";
import styles from "@/app/page.module.css";

export default function InconePage() {
  return (
    <div className={styles.main__next}>
      <div className={styles.description}>
        <Balance />
        <Expenses />
      </div>
    </div>
  );
}
