from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Course
from app.repositories.course_repo import CourseRepository
from app.schemas.course import CourseCreate, CourseUpdate


class CourseService:

    def __init__(self, db: Session):
        self.repo = CourseRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def get_course(self, course_id: int):
        course = self.repo.get_by_id(course_id)

        if course is None:
            raise HTTPException(404, "Course not found")

        return course

    def create_course(self, course_data: CourseCreate):
        course = Course(**course_data.model_dump())
        return self.repo.create(course)

    def update_course(
        self,
        course_id: int,
        course_data: CourseUpdate,
    ):
        course = self.repo.get_by_id(course_id)

        if course is None:
            raise HTTPException(404, "Course not found")

        return self.repo.update(
            course,
            course_data.model_dump(),
        )

    def delete_course(self, course_id: int):
        course = self.repo.get_by_id(course_id)

        if course is None:
            raise HTTPException(404, "Course not found")

        self.repo.delete(course)

    

        if university is None:
            raise ValueError("University not found")

        return university.courses
