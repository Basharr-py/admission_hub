import { useMemo } from "react";
import Card from "../Card/Card";
import SearchableSelect from "../SearchableSelect/SearchableSelect";
import type { Subject } from "../../types/subject";
import type { OlevelEntry } from "../../types/olevel";
import type { University } from "../../types/university";
import styles from "./ExamScoreCard.module.css";

const GRADES = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];

interface ExamScoreCardProps {
  subjects: Subject[];
  olevelSubjects: OlevelEntry[];
  setOlevelSubjects: (entries: OlevelEntry[]) => void;
  jambScore: string;
  setJambScore: (value: string) => void;
  putmeScore: string;
  setPutmeScore: (value: string) => void;
  selectedUniversity?: University;
}

export default function ExamScoreCard({
  subjects,
  olevelSubjects,
  setOlevelSubjects,
  jambScore,
  setJambScore,
  putmeScore,
  setPutmeScore,
  selectedUniversity,
}: ExamScoreCardProps) {
  const requiresPutme = selectedUniversity?.screening_type === "POST_UTME";

  // Alphabetical regardless of whatever order the API returns them in.
  const sortedSubjects = useMemo(
    () => [...subjects].sort((a, b) => a.name.localeCompare(b.name)),
    [subjects]
  );

  function updateSubject(index: number, subjectId: number) {
    const next = [...olevelSubjects];
    next[index] = { ...next[index], subjectId };
    setOlevelSubjects(next);
  }

  function updateGrade(index: number, grade: string) {
    const next = [...olevelSubjects];
    next[index] = { ...next[index], grade };
    setOlevelSubjects(next);
  }

  return (
    <Card title="Examination Scores" description="Enter your UTME score and O'Level results.">
      <div className={styles.scoreRow}>
        <div className={styles.field}>
          <label className={styles.label}>JAMB / UTME Score</label>
          <input
            type="number"
            min={0}
            max={400}
            value={jambScore}
            onChange={(e) => setJambScore(e.target.value)}
            placeholder="0 - 400"
            className={styles.numberInput}
          />
        </div>

        {requiresPutme && (
          <div className={styles.field}>
            <label className={styles.label}>Post-UTME Score</label>
            <input
              type="number"
              min={0}
              value={putmeScore}
              onChange={(e) => setPutmeScore(e.target.value)}
              placeholder="Enter score"
              className={styles.numberInput}
            />
          </div>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.olevelHeader}>
          <label className={styles.label}>O'Level Subjects &amp; Grades</label>
          <span className={styles.hint}>All 5 required</span>
        </div>

        <div className={styles.olevelList}>
          {olevelSubjects.map((entry, index) => {
            const takenElsewhere = olevelSubjects
              .filter((_, i) => i !== index)
              .map((e) => e.subjectId)
              .filter((id): id is number => id !== null);

            return (
              <div key={index} className={styles.olevelRow}>
                <div className={styles.subjectSelect}>
                  <SearchableSelect
                    options={sortedSubjects
                      .filter((s) => !takenElsewhere.includes(s.id))
                      .map((s) => ({ value: s.id, label: s.name }))}
                    value={entry.subjectId}
                    onChange={(id) => updateSubject(index, id)}
                    placeholder={`Subject ${index + 1}`}
                    searchPlaceholder="Search subjects..."
                    emptyMessage="No matching subjects"
                  />
                </div>

                <select
                  value={entry.grade}
                  onChange={(e) => updateGrade(index, e.target.value)}
                  className={styles.gradeSelect}
                >
                  <option value="">Grade</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}