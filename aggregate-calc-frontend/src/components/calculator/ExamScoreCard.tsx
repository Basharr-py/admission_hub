import Card from "../ui/Card";

import NoticeCard from "../ui/NoticeCard";
import OlevelSection from "./OlevelSection";
import JambSection from "./JambSection";
import PutmeSection from "./PutmeSection";
import type { Subject } from "../../types/subject";
import type { University } from "../../types/university";


import { FaClipboardList } from "react-icons/fa";




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
jambScore: string;
    setJambScore: React.Dispatch<
        React.SetStateAction<string>
    >;

    putmeScore: string;
    setPutmeScore: React.Dispatch<
        React.SetStateAction<string>
    >;

    selectedUniversity?: University;
};

function ExamScoreCard({
    subjects,
    olevelSubjects,
    setOlevelSubjects,
    jambScore,
    setJambScore,
    putmeScore,
    setPutmeScore,
    selectedUniversity,
}: Props) {
  return (
    <Card title="Examination Scores"
      icon={<FaClipboardList />} >
      {selectedUniversity?.screening_type === "NO_OLEVEL_POINTS" ? (
  <NoticeCard
    title="O'Level Points"
    message={`${selectedUniversity.name} does not use O'Level points when calculating admission aggregate.`}
  />
) : (

      <OlevelSection
  subjects={subjects}
  olevelSubjects={olevelSubjects}
  setOlevelSubjects={setOlevelSubjects}
/> )}
<JambSection
    jambScore={jambScore}
    setJambScore={setJambScore}
/>
{selectedUniversity?.screening_type === "NONE" ? (
  <NoticeCard
    title="Screening"
    message={`${selectedUniversity.name} does not require a screening score for aggregate calculation.`}
  />
) : (

<PutmeSection
    putmeScore={putmeScore}
    setPutmeScore={setPutmeScore}
/>
)}
    </Card>
  );
}

export default ExamScoreCard;