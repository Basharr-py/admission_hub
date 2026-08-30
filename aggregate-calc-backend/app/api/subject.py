from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.subject import (
    SubjectCreate,
    SubjectUpdate,
    SubjectResponse,
)
from app.services.subject_service import SubjectService
from app.services.university_service import UniversityService

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"],
)


@router.get("", response_model=list[SubjectResponse])
def get_subjects(db: Session = Depends(get_db)):
    service = SubjectService(db)
    return service.get_all()


@router.post(
    "/",
    response_model=SubjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.create_subject(subject)


@router.put(
    "/{subject_id}",
    response_model=SubjectResponse,
)
def update_subject(
    subject_id: int,
    subject: SubjectUpdate,
    db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.update_subject(
        subject_id,
        subject,
    )


@router.delete(
    "/{subject_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db),
):
    service = SubjectService(db)
    service.delete_subject(subject_id)


