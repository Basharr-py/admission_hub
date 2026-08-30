from datetime import datetime

from sqlalchemy import Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class GradingSystem(Base):
    __tablename__ = "grading_systems"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(unique=True)

    description: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    grade_points = relationship(
        "GradePoint",
        back_populates="grading_system",
        cascade="all, delete-orphan"
    )

    admission_formulas = relationship(
        "AdmissionFormula",
        back_populates="grading_system"
    )
