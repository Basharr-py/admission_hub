from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Subject
from app.repositories.subject_repo import SubjectRepository
from app.schemas.subject import SubjectCreate, SubjectUpdate


class SubjectService:

    def __init__(self, db: Session):
        self.repo = SubjectRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def get_subject(self, subject_id: int):
        subject = self.repo.get_by_id(subject_id)

        if subject is None:
            raise HTTPException(404, "Subject not found")

        return subject

    def create_subject(self, subject_data: SubjectCreate):
        subject = Subject(**subject_data.model_dump())
        return self.repo.create(subject)

    def update_subject(
        self,
        subject_id: int,
        subject_data: SubjectUpdate,
    ):
        subject = self.repo.get_by_id(subject_id)

        if subject is None:
            raise HTTPException(404, "Subject not found")

        return self.repo.update(
            subject,
            subject_data.model_dump(),
        )

    def delete_subject(self, subject_id: int):
        subject = self.repo.get_by_id(subject_id)

        if subject is None:
            raise HTTPException(404, "Subject not found")

        self.repo.delete(subject)

    

        