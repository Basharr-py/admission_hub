from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict

class ScreeningType(str, Enum):
    POST_UTME = "POST_UTME"
    NONE = "NONE"
    NO_OLEVEL_POINTS = "NO_OLEVEL_POINTS"

class UniversityUpdate(BaseModel):
    # name: str
    # short_name: str
    # state: str
    # ownership: str | None = None
    # website: str | None = None
    logo_url: str | None = None
    screening_type: ScreeningType
    is_active: bool

class UniversityCreate(BaseModel):
    name: str
    short_name: str
    state: str
    ownership: str | None = None
    website: str | None = None
    logo_url: str | None = None
    screening_type: ScreeningType
    is_active: bool = True

class UniversityResponse(BaseModel):
    id: int
    name: str
    short_name: str
    state: str
    ownership: str | None
    website: str | None
    logo_url: str | None
    screening_type: ScreeningType
    is_active: bool
    # created_at: datetime
    # updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
