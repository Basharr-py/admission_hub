import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Navbar from "../../../components/home/Navbar";
import Footer from "../../../components/home/Footer";

import type { OlevelEntry } from "../../../types/olevel";
import type { University } from "../../../types/university";
import type { Course } from "../../../types/course";
import type { Subject } from "../../../types/subject";
import type { AdmissionFormula } from "../../../types/admissionFormula";

import { getUniversities, getCourses, getAdmissionFormula } from "../../../api/university";
import { getSubjects } from "../../../api/subject";
import { calculateAggregate } from "../../../api/calculator";

import UniversityCourseCard from "../../UniversityCourseCard/UniversityCourseCard";
import ExamScoreCard from "../../ExamScoreCard/ExamScoreCard";
import ResultCard from "../../ResultCard/ResultCard";

import styles from "./CalculatorPage.module.css";

function CalculatorPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState<number | null>(null);

  const selectedUniversity = universities.find((u) => u.id === selectedUniversityId);

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const [jambScore, setJambScore] = useState("");
  const [putmeScore, setPutmeScore] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formula, setFormula] = useState<AdmissionFormula | null>(null);
  const [aggregateResult, setAggregateResult] = useState<number | null>(null);

  const [olevelSubjects, setOlevelSubjects] = useState<OlevelEntry[]>([
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
  ]);

  const handleCalculate = async () => {
    setErrorMessage("");

    if (!selectedUniversityId) {
      setErrorMessage("Please select a university.");
      return;
    }

    if (!selectedCourse) {
      setErrorMessage("Please select a course.");
      return;
    }

    const completedSubjects = olevelSubjects.filter(
      (subject) => subject.subjectId !== null && subject.grade !== ""
    );

    if (completedSubjects.length !== 5) {
      setErrorMessage("Please select all five O'Level subjects and grades.");
      return;
    }

    if (!jambScore) {
      setErrorMessage("Please enter your JAMB score.");
      return;
    }

    if (Number(jambScore) < 0 || Number(jambScore) > 400) {
      setErrorMessage("JAMB score must be between 0 and 400.");
      return;
    }

    if (putmeScore && Number(putmeScore) < 0) {
      setErrorMessage("POST-UTME score cannot be negative.");
      return;
    }

    if (formula && formula.putme_max_score !== null && Number(putmeScore) > formula.putme_max_score) {
      setErrorMessage(`POST-UTME score cannot exceed ${formula.putme_max_score}.`);
      return;
    }

    const payload = {
      university_id: selectedUniversityId,
      course_id: selectedCourse,
      jamb_score: Number(jambScore),
      putme_score: putmeScore ? Number(putmeScore) : null,
      grades: olevelSubjects.map((item) => ({
        subject_id: item.subjectId,
        grade: item.grade,
      })),
    };

    try {
      setIsCalculating(true);
      const result = await calculateAggregate(payload);
      setAggregateResult(result.aggregate_score);
    } catch (error) {
      setErrorMessage("Unable to calculate aggregate.");
    } finally {
      setIsCalculating(false);
    }
  };

  async function handleUniversityChange(id: number) {
    setSelectedUniversityId(id);

    const courses = await getCourses(id);
    setCourses(courses);

    const formula = await getAdmissionFormula(id);
    setFormula(formula);

    setSelectedCourse(null);
  }

  useEffect(() => {
    async function loadData() {
      const universityList = await getUniversities();
      const subjectList = await getSubjects();

      setUniversities(universityList);
      setSubjects(subjectList);
    }

    loadData();
  }, []);

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <section className={styles.heroSection}>
          <div className={styles.inner}>
            <Link to="/" className={styles.backLink}>
              <ArrowLeft size={15} strokeWidth={2.4} />
              Back to Home
            </Link>
            <span className={styles.eyebrow}>Aggregate Calculator</span>
            <h1 className={styles.title}>University Aggregate Calculator</h1>
            <p className={styles.subhead}>
              Calculate your admission aggregate score for Nigerian universities accurately using
              official admission formulas.
            </p>
          </div>
        </section>

        <div className={styles.inner}>
          <div className={styles.topGrid}>
            <UniversityCourseCard
              universities={universities}
              courses={courses}
              selectedUniversity={selectedUniversityId}
              selectedCourse={selectedCourse}
              onUniversityChange={handleUniversityChange}
              onCourseChange={(id) => setSelectedCourse(id)}
            />

            <ExamScoreCard
              subjects={subjects}
              olevelSubjects={olevelSubjects}
              setOlevelSubjects={setOlevelSubjects}
              jambScore={jambScore}
              setJambScore={setJambScore}
              putmeScore={putmeScore}
              setPutmeScore={setPutmeScore}
              selectedUniversity={selectedUniversity}
            />
          </div>

          <div className={styles.bottomGrid}>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            <ResultCard
              aggregateResult={aggregateResult}
              onCalculate={handleCalculate}
              isCalculating={isCalculating}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CalculatorPage;