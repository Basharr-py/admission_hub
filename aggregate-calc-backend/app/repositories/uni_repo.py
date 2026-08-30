from sqlalchemy.orm import Session

from app.models import University, Course, AdmissionFormula
from app.repositories.base import BaseRepository


class UniversityRepository(BaseRepository[University]):

    def update(self, university, data: dict):
        for key, value in data.items():
            setattr(university, key, value)

        self.db.commit()
        self.db.refresh(university)
        return university


    def delete(self, university):
        self.db.delete(university)
        self.db.commit()

    def create(self, university):
        self.db.add(university)
        self.db.commit()
        self.db.refresh(university)
        return university

    def get_by_id(
        self,
        university_id: int,
    ):
        
        return (
            self.db.query(University)
            .filter(
                University.id == university_id
            )
            .first()
        )

        return (
            self.db.query(University)
            .filter(
                University.short_name.ilike(identifier)
            )
            .first()
        )

    def get_all(self):
        return (
            self.db.query(University)
            .filter(University.is_active == True)
            .order_by(University.name)
            .all()
        )

    def get_by_short_name(self, short_name: str):
        return (
            self.db.query(University)
            .filter(University.short_name == short_name)
            .first()
        )
    def get_courses(self, university_id: int):
        university = (
            self.db.query(University)
            .filter(University.id == university_id)
            .first()
    
        )

        return university


    def get_admission_formula(
        self,
        university_id: int,
    ):
        return (
            self.db.query(AdmissionFormula)
            .filter(
                AdmissionFormula.university_id == university_id
            )
            .first()
        )

    def create_admission_formula(
        self,
        formula: AdmissionFormula,
    ):
        self.db.add(formula)
        self.db.commit()
        self.db.refresh(formula)
        return formula

    def update_admission_formula(
        self,
        formula,
        data: dict,
    ):
        for key, value in data.items():
            setattr(formula, key, value)

        self.db.commit()
        self.db.refresh(formula)

        return formula
