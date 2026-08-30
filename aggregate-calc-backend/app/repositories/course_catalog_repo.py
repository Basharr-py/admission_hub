from sqlalchemy.orm import Session

from app.models import CourseCatalog


class CourseCatalogRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(CourseCatalog).all()

    def get_by_id(self, catalog_id: int):
        return (
            self.db.query(CourseCatalog)
            .filter(CourseCatalog.id == catalog_id)
            .first()
        )

    def get_by_name(self, name: str):
        return (
            self.db.query(CourseCatalog)
            .filter(CourseCatalog.name == name)
            .first()
        )

    def get_by_code(self, code: str):
        return (
            self.db.query(CourseCatalog)
            .filter(CourseCatalog.code == code)
            .first()
        )

    def create(self, course_catalog: CourseCatalog):
        self.db.add(course_catalog)
        self.db.commit()
        self.db.refresh(course_catalog)
        return course_catalog

    def update(self, course_catalog, data: dict):
        for key, value in data.items():
            setattr(course_catalog, key, value)

        self.db.commit()
        self.db.refresh(course_catalog)
        return course_catalog

    def delete(self, course_catalog):
        self.db.delete(course_catalog)
        self.db.commit()
