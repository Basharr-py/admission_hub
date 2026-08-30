from app.database.session import SessionLocal
from app.models import Subject

subjects = [
    {"code": "ENG", "name": "English Language"},
    {"code": "MTH", "name": "Mathematics"},
    {"code": "PHY", "name": "Physics"},
    {"code": "CHM", "name": "Chemistry"},
    {"code": "BIO", "name": "Biology"},
    {"code": "ECO", "name": "Economics"},
    {"code": "GOV", "name": "Government"},
    {"code": "LIT", "name": "Literature in English"},
    {"code": "CRS", "name": "Christian Religious Studies"},
    {"code": "IRS", "name": "Islamic Religious Studies"},
    {"code": "GEO", "name": "Geography"},
    {"code": "AGR", "name": "Agricultural Science"},
    {"code": "COM", "name": "Commerce"},
    {"code": "ACC", "name": "Financial Accounting"},
    {"code": "CIV", "name": "Civic Education"},
    {"code": "ARB", "name": "Arabic"},
    {"code": "FRE", "name": "French"},
    {"code": "YOR", "name": "Yoruba"},
    {"code": "HAU", "name": "Hausa"},
    {"code": "IGB", "name": "Igbo"},
]

db = SessionLocal()

try:
    for subject in subjects:
        exists = (
            db.query(Subject)
            .filter(Subject.code == subject["code"])
            .first()
        )

        if not exists:
            db.add(Subject(**subject))

    db.commit()
    print("✅ Subjects seeded successfully!")

finally:
    db.close()
