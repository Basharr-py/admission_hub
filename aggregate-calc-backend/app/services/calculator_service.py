from sqlalchemy.orm import Session

from app.models import University, AdmissionFormula, GradePoint, Course
from fastapi import HTTPException

class CalculatorService:

    def __init__(self, db: Session):
        self.db = db

    def calculate(self, request):

        university = (
            self.db.query(University)
            .filter(University.id == request.university_id)
            .first()
        )

        if university is None:
            raise HTTPException(
                status_code=404,
                detail="University not found",
            )

        course = (
            self.db.query(Course)
            .filter(
                Course.id == request.course_id,
                Course.university_id == university.id,
            )
            .first()
        )

        if course is None:
            raise HTTPException(
                status_code=404,
                detail="Course not found",
            )

        formula = (
            self.db.query(AdmissionFormula)
            .filter(
                AdmissionFormula.university_id == university.id
            )
            .first()
        )

        if formula is None:
            raise HTTPException(
                status_code=404,
                detail="Admission formula not found",
            )

        grade_points = (
            self.db.query(GradePoint)
            .filter(
                GradePoint.grading_system_id == formula.grading_system_id
            )
            .all()
        )

        grade_map = {
            gp.grade: gp.points
            for gp in grade_points
        }

        olevel_points = 0

        for subject in request.grades:
            points = grade_map.get(subject.grade)

            if points is None:
                raise ValueError(
                    f"No points defined for grade {subject.grade}"
                )

            olevel_points += points

        jamb_score = (
            request.jamb_score /
            float(formula.jamb_divisor)
        )

        olevel_score = (
            float(olevel_points) /
            float(formula.max_olevel_points)
        ) * float(formula.olevel_weight)

        putme_score = 0

        if (
            request.putme_score is not None
            and formula.putme_divisor is not None
        ):
            if (
                formula.putme_max_score is not None
                and request.putme_score > formula.putme_max_score
            ):
                raise HTTPException(
                    status_code=400,
                    detail=(
                        f"POST-UTME score cannot exceed "
                        f"{formula.putme_max_score}."
                    ),
                )

            if request.putme_score < 0:
                raise HTTPException(
                    status_code=400,
                    detail="POST-UTME score cannot be negative.",
                )

            putme_score = (
                request.putme_score /
                float(formula.putme_divisor)
            ) 


        aggregate = (
            jamb_score +
            olevel_score +
            putme_score
        )

        return {
            "university": university.name,
            "course": course.name,
            "aggregate_score": round(aggregate, 2),
        }

        # More logic will go here
        return {
            "olevel_points": float(olevel_points)
        }
