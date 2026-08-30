import Card from "../Card/Card";
import SearchableSelect from "../SearchableSelect/SearchableSelect";
import type { University } from "../../types/university";
import type { Course } from "../../types/course";
import styles from "./UniversityCourseCard.module.css";

interface UniversityCourseCardProps {
  universities: University[];
  courses: Course[];
  selectedUniversity: number | null;
  selectedCourse: number | null;
  onUniversityChange: (id: number) => void;
  onCourseChange: (id: number) => void;
}

export default function UniversityCourseCard({
  universities,
  courses,
  selectedUniversity,
  selectedCourse,
  onUniversityChange,
  onCourseChange,
}: UniversityCourseCardProps) {
  return (
    <Card
      title="University & Course"
      description="Choose the school and course you're applying for."
    >
      <div className={styles.field}>
        <label className={styles.label}>University</label>
        <SearchableSelect
          options={universities.map((u) => ({
            value: u.id,
            label: u.name,
            sublabel: u.short_name,
          }))}
          value={selectedUniversity}
          onChange={onUniversityChange}
          placeholder="Search and select a university"
          searchPlaceholder="Search universities..."
          emptyMessage="No universities found"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Course</label>
        <SearchableSelect
          options={courses.map((c) => ({ value: c.id, label: c.name }))}
          value={selectedCourse}
          onChange={onCourseChange}
          placeholder={selectedUniversity ? "Search and select a course" : "Select a university first"}
          searchPlaceholder="Search courses..."
          disabled={!selectedUniversity}
          emptyMessage="No courses found"
        />
      </div>
    </Card>
  );
}