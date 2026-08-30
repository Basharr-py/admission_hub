from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.schemas.admission_formula import AdmissionFormulaResponse, AdmissionFormulaCreate, AdmissionFormulaUpdate

from app.database.session import get_db
from app.schemas.university import UniversityResponse, UniversityCreate, UniversityUpdate
from app.schemas.course import CourseResponse
from app.services.university_service import UniversityService, HTTPException

router = APIRouter(prefix="/universities", tags=["Universities"])


@router.get("", response_model=list[UniversityResponse])
def get_universities(db: Session = Depends(get_db)):
    service = UniversityService(db)
    return service.get_all_universities()

@router.get("/{university_id}", response_model=UniversityResponse)
def get_university(
    university_id: int,
    db: Session = Depends(get_db)
):
    service = UniversityService(db)

    university = service.get_university(university_id)

    if university is None:
        raise HTTPException(
            status_code=404,
            detail="University not found"
        )

    return university

@router.post(
    "/",
    response_model=UniversityResponse,
    status_code=status.HTTP_201_CREATED
)
def create_university(
    university: UniversityCreate,
    db: Session = Depends(get_db)
):
    service = UniversityService(db)
    return service.create_university(university)

@router.put(
    "/{university_id}",
    response_model=UniversityResponse
)
def update_university(
    university_id: int,
    university: UniversityUpdate,
    db: Session = Depends(get_db)
):
    service = UniversityService(db)
    return service.update_university(
        university_id,
        university,
    )

@router.delete(
    "/{university_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_university(
    university_id: int,
    db: Session = Depends(get_db)
):
    service = UniversityService(db)
    service.delete_university(university_id)

@router.get(
    "/{university_id}/courses",
    response_model=list[CourseResponse],
)
def get_university_courses(
    university_id: int,
    db: Session = Depends(get_db),
):
    service = UniversityService(db)
    return service.get_courses(university_id)

@router.get(
    "/{university_id}/formula",
    response_model=AdmissionFormulaResponse,
)
def get_admission_formula(
    university_id: int,
    db: Session = Depends(get_db),
):
    service = UniversityService(db)

    return service.get_admission_formula(
        university_id
    )

@router.post(
    "/{university_id}/admission-formula",
    response_model=AdmissionFormulaResponse,
)
def create_formula(
    university_id: int,
    data: AdmissionFormulaCreate,
    db: Session = Depends(get_db),
):

    service = UniversityService(db)
    try:

        return service.create_formula(
            university_id,
            data,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.put(
    "/{university_id}/admission-formula",
    response_model=AdmissionFormulaResponse,
)
def update_formula(
    university_id: int,
    data: AdmissionFormulaUpdate,
    db: Session = Depends(get_db),
):

    service = UniversityService(db)

    try:
        return service.update_formula(
            university_id,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
