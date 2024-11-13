import { Balance } from "@/components/Finance/Balance/Balance";
import { ReportSummary } from "@/components/Finance/RaportSummary/RaportSummary";
import { Income } from "@/components/Finance/Income/Income";
import { Expenses } from "@/components/Finance/Expenses/Expenses";
import styles from "../page.module.css";

export default function FinancePage() {
  return (
    <div className={styles.main__next}>
      <div className={styles.description}>
        <Balance />
        {/* <ReportSummary /> */}
      <div style={{display: "flex"}}>
      <Income />
      <Expenses />
      </div>
        
      </div>
    </div>
  );
}
