from pydantic import BaseModel

from app.models.grade_point import OLevelGrade


class SubjectGrade(BaseModel):
    subject_id: int
    grade: OLevelGrade

class AggregateRequest(BaseModel):
    university_id: int
    course_id: int
    jamb_score: int
    putme_score: float | None = None
    grades: list[SubjectGrade]


class AggregateResponse(BaseModel):
    university: str
    course: str
    aggregate_score: float
