from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Numeric, func, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class AdmissionFormula(Base):
    __tablename__ = "admission_formulas"

    id: Mapped[int] = mapped_column(primary_key=True)

    university_id: Mapped[int] = mapped_column(
        ForeignKey("universities.id", ondelete="CASCADE"),
        unique=True,
    )

    jamb_weight: Mapped[float] = mapped_column(Numeric(5, 2))
    putme_weight: Mapped[float] = mapped_column(Numeric(5, 2))
    olevel_weight: Mapped[float] = mapped_column(Numeric(5, 2))

    jamb_divisor: Mapped[float] = mapped_column(Numeric(5, 2))
    putme_divisor: Mapped[float | None] = mapped_column(Numeric(5, 2))
    max_olevel_points: Mapped[int | None]
    putme_max_score: Mapped[int | None] = mapped_column(Integer)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    university: Mapped["University"] = relationship(
        back_populates="admission_formula"
    )
    
    grading_system_id: Mapped[int] = mapped_column(
        ForeignKey("grading_systems.id")
    )

    grading_system = relationship(
        "GradingSystem",
        back_populates="admission_formulas"
    )
