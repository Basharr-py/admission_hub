from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)

    university_id: Mapped[int] = mapped_column(
        ForeignKey("universities.id", ondelete="CASCADE")
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    course_catalog_id: Mapped[int | None] = mapped_column(
        ForeignKey("course_catalog.id"),
        nullable=True,
    )

    min_jscore: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    current_cutoff: Mapped[float | None] = mapped_column(
        Numeric(5, 2)
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    university: Mapped["University"] = relationship(
        back_populates="courses"
    )

    subject_requirements: Mapped[list["CourseSubjectRequirement"]] = relationship(
        back_populates="course",
        cascade="all, delete-orphan",
    )

    course_catalog: Mapped["CourseCatalog"] = relationship(
        back_populates="courses"
    )
