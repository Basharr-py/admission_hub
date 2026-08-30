import { Loader2, Calculator as CalculatorIcon } from "lucide-react";
import Card from "../Card/Card";
import styles from "./ResultCard.module.css";

interface ResultCardProps {
  aggregateResult: number | null;
  onCalculate: () => void;
  isCalculating: boolean;
}

export default function ResultCard({ aggregateResult, onCalculate, isCalculating }: ResultCardProps) {
  return (
    <Card>
      <div className={styles.wrap}>
        <div className={styles.resultSide}>
          <span className={styles.resultLabel}>Your Aggregate</span>
          {aggregateResult !== null ? (
            <span className={styles.resultValue}>{aggregateResult.toFixed(2)}</span>
          ) : (
            <>
              <span className={styles.resultPlaceholder}>—</span>
              <span className={styles.resultHint}>
                Fill in the form and calculate to see your result
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.calculateBtn}
          onClick={onCalculate}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 size={17} className={styles.spinner} strokeWidth={2.4} />
              Calculating...
            </>
          ) : (
            <>
              <CalculatorIcon size={17} strokeWidth={2.4} />
              Calculate Aggregate
            </>
          )}
        </button>
      </div>
    </Card>
  );
}