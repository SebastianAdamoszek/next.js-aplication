import { ExpenseTracker } from "../../components/Expenses/Expenses";
import styles from "../page.module.css";

export default function MoneyBalancePage() {
  return (
  <div className={styles.main__next}>
  <div className={styles.description}>
  <ExpenseTracker />
  </div>
</div>
)  
};
