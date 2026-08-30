from sqlalchemy.orm import Session

from app.models import Course, CourseCatalog


class CourseRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Course).all()

    def get_by_id(self, course_id: int):
        return (
            self.db.query(Course)
            .filter(Course.id == course_id)
            .first()
        )

    def create(self, course):

        catalog = (
            self.db.query(CourseCatalog)
            .filter(CourseCatalog.id == course.course_catalog_id)
            .first()
        )

        if not catalog:
            raise ValueError("Invalid course_catalog_id")

        course.name = catalog.name

        self.db.add(course)
        self.db.commit()
        self.db.refresh(course)

        return course

    def update(self, course, data: dict):
        for key, value in data.items():
            setattr(course, key, value)

        self.db.commit()
        self.db.refresh(course)
        return course

    def delete(self, course):
        self.db.delete(course)
        self.db.commit()

    def get_by_course_catalog(self, course_catalog_id: int):
        return (
            self.db.query(Course)
            .filter(
                Course.course_catalog_id == course_catalog_id
            )
            .all()
        )
