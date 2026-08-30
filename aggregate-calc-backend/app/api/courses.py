from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.course import (
    CourseCreate,
    CourseUpdate,
    CourseResponse,
)
from app.services.course_service import CourseService
from app.services.university_service import UniversityService

router = APIRouter(
    prefix="/courses",
    tags=["Courses"],
)


@router.get("", response_model=list[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    service = CourseService(db)
    return service.get_all()


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    service = CourseService(db)
    return service.get_course(course_id)


@router.post(
    "/",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
):
    service = CourseService(db)
    return service.create_course(course)


@router.put(
    "/{course_id}",
    response_model=CourseResponse,
)
def update_course(
    course_id: int,
    course: CourseUpdate,
    db: Session = Depends(get_db),
):
    service = CourseService(db)
    return service.update_course(
        course_id,
        course,
    )


@router.delete(
    "/{course_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
):
    service = CourseService(db)
    service.delete_course(course_id)


