import Card from "../ui/Card";
import Input from "../ui/Input";

type Props = {
  putmeScore: string;
  setPutmeScore: React.Dispatch<
    React.SetStateAction<string>
  >;
};

function PutmeSection({
  putmeScore,
  setPutmeScore,
}: Props) {
  return (
    <Card title="POST-UTME">
      <Input
        label="POST-UTME Score"
        type="number"
        value={putmeScore}
        min={0}
        onChange={setPutmeScore}
      />
    </Card>
  );
}

export default PutmeSection;