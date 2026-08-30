from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.course_catalog import router as course_catalog_router
from app.api.calculator import router as calculator_router
from app.api.courses import router as course_router
from app.api.subject import router as subject_router
from app.api.universities import router as university_router

app = FastAPI(
    title="Nigerian University Aggregate Calculator API",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://34.229.9.30:8080"],
    allow_origin_regex=r"https://.*\.duckdns\.org",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(course_catalog_router)
app.include_router(course_router)
app.include_router(university_router)
app.include_router(calculator_router)
app.include_router(subject_router)

@app.get("/")
def root():
    return {
        "message": "API is running successfully."
    }

