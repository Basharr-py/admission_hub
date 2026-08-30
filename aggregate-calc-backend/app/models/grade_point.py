from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SQLEnum, ForeignKey, Numeric, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class OLevelGrade(str, Enum):
    A1 = "A1"
    B2 = "B2"
    B3 = "B3"
    C4 = "C4"
    C5 = "C5"
    C6 = "C6"
    D7 = "D7"
    E8 = "E8"
    F9 = "F9"


class GradePoint(Base):
    __tablename__ = "grade_points"

    id: Mapped[int] = mapped_column(primary_key=True)

    grading_system_id: Mapped[int] = mapped_column(
        ForeignKey("grading_systems.id", ondelete="CASCADE")
    )

    grade: Mapped[OLevelGrade] = mapped_column(
        SQLEnum(OLevelGrade, name="olevel_grade")
    )

    points: Mapped[float] = mapped_column(
        Numeric(4, 2)
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    grading_system = relationship(
        "GradingSystem",
        back_populates="grade_points"
    )
