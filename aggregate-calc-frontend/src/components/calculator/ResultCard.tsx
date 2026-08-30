import Card from "../ui/Card";
import "./ResultCard.css";
import Button from "../ui/Button";
import { FaChartBar } from "react-icons/fa";



type Props = {
  aggregateResult: number | null;
  onCalculate: () => void | Promise<void>;
  isCalculating: boolean;
};

function ResultCard({
  aggregateResult,
  onCalculate,
  isCalculating,
}: Props) {
  return (
    <Card title="Result"
      icon={<FaChartBar />}>
      <div className="result">

        <p className="result-label">
          Aggregate Score
        </p>

        <h1 className="result-score">
          {aggregateResult !== null
            ? aggregateResult.toFixed(2)
            : "--"}
        </h1>

        <Button onClick={onCalculate}
          disabled={isCalculating}>
            {isCalculating ? "Calculating..." : "Calculate"}
        </Button>

      </div>
    </Card>
  );
}



export default ResultCard;