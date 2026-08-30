import Card from "../ui/Card";
import Select from "../ui/Select";
import type { University } from "../../types/university";
import type { Course } from "../../types/course";
import { FaUniversity } from "react-icons/fa";


type Props = {
  universities: University[];
  courses: Course[];
  selectedUniversity: number | null;
  selectedCourse: number | null;
  onUniversityChange: (id: number) => void;
  onCourseChange: (id: number) => void;
};

function UniversityCourseCard({
    universities,
    courses,
    selectedUniversity,
    selectedCourse,
    onUniversityChange,
    onCourseChange,
    }: Props) {
    

    return (
        <Card title="University & Course"
            icon={<FaUniversity />}>
        <Select
            label="University"
            options={universities.map((university) => ({
                value: university.id,
                label: university.name,
            }))}
            value={selectedUniversity ?? ""}
            onChange={(value) =>
                onUniversityChange(Number(value))
            }
            />

        <Select
            label="Course"
            options={courses.map((course) => ({
                value: course.id,
                label: course.name,
            }))}
            value={selectedCourse ?? ""}
            onChange={(value) =>
            onCourseChange(Number(value))
            }
        />
        </Card>
    );
}

export default UniversityCourseCard;
