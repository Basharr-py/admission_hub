from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CourseBase(BaseModel):
    
    min_jscore: int
    current_cutoff: float | None = None
    university_id: int

class CourseCreate(CourseBase):
    university_id: int
    course_catalog_id: int | None = None

class CourseUpdate(CourseBase):
    course_catalog_id: int | None = None
    


class CourseResponse(CourseBase):
    id: int
    name: str
    university_id: int
    course_catalog_id: int | None = None

    model_config = ConfigDict(from_attributes=True)
