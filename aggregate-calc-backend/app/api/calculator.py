from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.calculator import AggregateRequest
from app.services.calculator_service import CalculatorService

router = APIRouter(
    prefix="/calculator",
    tags=["Calculator"],
)


@router.post("/calculate")
def calculate(
    request: AggregateRequest,
    db: Session = Depends(get_db),
):
    service = CalculatorService(db)
    return service.calculate(request)