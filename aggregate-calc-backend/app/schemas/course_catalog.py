from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CourseCatalogBase(BaseModel):
    code: str
    name: str


class CourseCatalogCreate(CourseCatalogBase):
    pass


class CourseCatalogResponse(CourseCatalogBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
