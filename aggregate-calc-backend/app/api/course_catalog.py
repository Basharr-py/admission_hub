from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.course_catalog_repo import (
    CourseCatalogRepository,
)
from app.schemas.course_catalog import (
    CourseCatalogCreate,
    CourseCatalogResponse,
)
from app.services.course_catalog_service import (
    CourseCatalogService,
)

router = APIRouter(
    prefix="/course-catalog",
    tags=["Course Catalog"],
)


def get_service(db: Session = Depends(get_db)):
    repo = CourseCatalogRepository(db)
    return CourseCatalogService(repo)


@router.get(
    "",
    response_model=list[CourseCatalogResponse],
)
def get_all_courses(
    service: CourseCatalogService = Depends(get_service),
):
    return service.get_all()


@router.get(
    "/{catalog_id}",
    response_model=CourseCatalogResponse,
)
def get_course(
    catalog_id: int,
    service: CourseCatalogService = Depends(get_service),
):
    course = service.get_by_id(catalog_id)

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found.",
        )

    return course


@router.post(
    "/",
    response_model=CourseCatalogResponse,
)
def create_course(
    data: CourseCatalogCreate,
    service: CourseCatalogService = Depends(get_service),
):
    return service.create(data)


@router.delete("/{catalog_id}")
def delete_course(
    catalog_id: int,
    service: CourseCatalogService = Depends(get_service),
):
    deleted = service.delete(catalog_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Course not found.",
        )

    return {
        "message": "Course deleted successfully."
    }
