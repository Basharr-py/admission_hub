from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SubjectBase(BaseModel):
    name: str
    


class SubjectCreate(SubjectBase):
    name: str
    code: str

class SubjectUpdate(SubjectBase):
    name: str 
    code: str

class SubjectResponse(SubjectBase):
    id: int
    name: str
    code: str

    model_config = ConfigDict(from_attributes=True)