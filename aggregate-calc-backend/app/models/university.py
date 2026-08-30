from datetime import datetime

from sqlalchemy import BigInteger, Boolean, String, Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class University(Base):
    __tablename__ = "universities"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        unique=True,
    )

    short_name: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        unique=True,
    )

    state: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    ownership: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    website: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    logo_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    screening_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    courses: Mapped[list["Course"]] = relationship(
        back_populates="university",
        cascade="all, delete-orphan",
    )

    admission_formula: Mapped["AdmissionFormula | None"] = relationship(
        back_populates="university",
        uselist=False,
        cascade="all, delete-orphan",
    )
