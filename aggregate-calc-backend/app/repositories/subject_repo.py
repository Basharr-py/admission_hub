from sqlalchemy.orm import Session

from app.models import Subject


class SubjectRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Subject).all()

    def get_by_id(self, subject_id: int):
        return (
            self.db.query(Subject)
            .filter(Subject.id == subject_id)
            .first()
        )

    def create(self, subject: Subject):
        self.db.add(subject)
        self.db.commit()
        self.db.refresh(subject)
        return subject 

    def update(self, subject, data: dict):
        for key, value in data.items():
            setattr(subject, key, value)

        self.db.commit()
        self.db.refresh(subject)
        return subject

    def delete(self, subject):
        self.db.delete(subject)
        self.db.commit()
