import Card from "../ui/Card";
import Select from "../ui/Select";
import type { Subject } from "../../types/subject";

type OlevelEntry = {
  subjectId: number | null;
  grade: string;
};

type Props = {
  subjects: Subject[];
  olevelSubjects: OlevelEntry[];
  setOlevelSubjects: React.Dispatch<
    React.SetStateAction<OlevelEntry[]>
  >;
};

function OlevelSection({
  subjects,
  olevelSubjects,
  setOlevelSubjects,
}: Props) {
  const grades = [
    { value: "A1", label: "A1" },
    { value: "B2", label: "B2" },
    { value: "B3", label: "B3" },
    { value: "C4", label: "C4" },
    { value: "C5", label: "C5" },
    { value: "C6", label: "C6" },
  ];

  const selectedSubjects = olevelSubjects
    .map((item) => item.subjectId)
    .filter((id): id is number => id !== null);

  return (
    <Card title="O'Level Results">
      {olevelSubjects.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Select
            label={`Subject ${index + 1}`}
            options={subjects
              .filter(
                (subject) =>
                  !selectedSubjects.includes(subject.id) ||
                  subject.id === item.subjectId
              )
              .map((subject) => ({
                value: subject.id,
                label: subject.name,
              }))}
            value={item.subjectId ?? ""}
            onChange={(value) => {
            const updated = [...olevelSubjects];
            updated[index].subjectId = Number(value);
            setOlevelSubjects(updated);
          }}
          />

          <Select
            label="Grade"
            options={grades}
            value={item.grade}
            onChange={(value) => {
              const updated = [...olevelSubjects];
              updated[index].grade = value;
              setOlevelSubjects(updated);
            }}
          />
        </div>
      ))}
    </Card>
  );
}

export default OlevelSection;