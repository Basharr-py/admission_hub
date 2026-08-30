from app.models import CourseCatalog
from app.repositories.course_catalog_repo import (
    CourseCatalogRepository,
)
from app.schemas.course_catalog import (
    CourseCatalogCreate,
)


class CourseCatalogService:

    def __init__(
        self,
        course_catalog_repo: CourseCatalogRepository,
    ):
        self.course_catalog_repo = course_catalog_repo

    def get_all(self):
        return self.course_catalog_repo.get_all()

    def get_by_id(self, catalog_id: int):
        return self.course_catalog_repo.get_by_id(
            catalog_id
        )

    def create(
        self,
        data: CourseCatalogCreate,
    ):
        existing = (
            self.course_catalog_repo.get_by_name(
                data.name
            )
        )

        if existing:
            raise ValueError(
                "Course already exists in catalog."
            )

        course_catalog = CourseCatalog(
            code=data.code,
            name=data.name,
        )

        return self.course_catalog_repo.create(
            course_catalog
        )

    def update(self, catalog_id: int, data: dict):
        course_catalog = (
            self.course_catalog_repo.get_by_id(
                catalog_id
            )
        )

        if not course_catalog:
            return None

        return self.course_catalog_repo.update(
            course_catalog,
            data,
        )

    def delete(self, catalog_id: int):
        course_catalog = (
            self.course_catalog_repo.get_by_id(
                catalog_id
            )
        )

        if not course_catalog:
            return False

        self.course_catalog_repo.delete(
            course_catalog
        )

        return True
