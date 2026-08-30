from datetime import datetime
from pydantic import BaseModel
from pydantic import ConfigDict

class AdmissionFormulaBase(BaseModel):
    jamb_weight: float
    putme_weight: float
    olevel_weight: float

    jamb_divisor: float
    putme_divisor: float | None

    putme_max_score: float | None
    max_olevel_points: int
    grading_system_id: int

    class Config:
        from_attributes = True

class AdmissionFormulaCreate(
    AdmissionFormulaBase
):
    pass


class AdmissionFormulaUpdate(
    AdmissionFormulaBase
):
    pass


class AdmissionFormulaResponse(
    AdmissionFormulaBase
):
    id: int
    university_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
