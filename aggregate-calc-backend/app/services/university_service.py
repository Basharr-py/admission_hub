from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import University, AdmissionFormula
from app.schemas.university import UniversityCreate, UniversityUpdate
from app.schemas.admission_formula import AdmissionFormulaResponse, AdmissionFormulaResponse, AdmissionFormulaUpdate, AdmissionFormulaCreate

from app.repositories.uni_repo import UniversityRepository


class UniversityService:

    def update_university(
        self,
        university_id: int,
        university_data: UniversityUpdate
    ):
        university = self.repo.get_by_id(university_id)

        if university is None:
            raise HTTPException(
                status_code=404,
                detail="University not found"
            )

        return self.repo.update(
            university,
            university_data.model_dump()
        )


    def delete_university(self, university_id: int):
        university = self.repo.get_by_id(university_id)

        if university is None:
            raise HTTPException(
                status_code=404,
                detail="University not found"
            )

        self.repo.delete(university)

    def __init__(self, db: Session):
        self.repo = UniversityRepository(db)

    def get_all_universities(self):
        return self.repo.get_all()

    def get_university(self, university_id: int):
        return self.repo.get_by_id(university_id)

    def create_university(self, university_data: UniversityCreate):
        university = University(**university_data.model_dump())
        return self.repo.create(university)

    def get_courses(self, university_id: int):
        university = self.repo.get_courses(university_id)

        if university is None:
            raise HTTPException(
                status_code=404,
                detail="University not found"
            )

        return sorted(
            university.courses,
            key=lambda course: course.name
        )

    def get_admission_formula(self, university_id: int):

        university = self.repo.get_by_id(university_id)

        if university is None:
            raise HTTPException(
                status_code=404,
                detail="University not found",
            )

        formula = self.repo.get_admission_formula(university_id)

        if formula is None:
            raise HTTPException(
                status_code=404,
                detail="Admission formula not found",
            )

        return formula


    def create_formula(
        self,
        university_id: int,
        data: AdmissionFormulaCreate,
    ):

        university = self.repo.get_by_id(university_id)

        if not university:
            raise ValueError("University not found.")

        if self.repo.get_admission_formula(university_id):
            raise ValueError(
                "Admission formula already exists."
            )

        formula = AdmissionFormula(
            university_id=university_id,
            **data.model_dump(),
        )

        return self.repo.create_admission_formula(
            formula
        )

    def update_formula(
        self,
        university_id: int,
        data: AdmissionFormulaUpdate,
    ):

        formula = self.repo.get_admission_formula(
            university_id
        )

        if not formula:
            raise ValueError(
                "Admission formula not found."
            )

        return self.repo.update_admission_formula(
            formula,
            data.model_dump(),
        )
