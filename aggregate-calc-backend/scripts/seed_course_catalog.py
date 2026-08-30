import json
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.course_catalog import CourseCatalog


def seed():
    db: Session = SessionLocal()

    with open("data/course_catalog.json", "r", encoding="utf-8") as f:
        courses = json.load(f)

    added = 0
    skipped = 0

    for item in courses:
        exists = (
            db.query(CourseCatalog)
            .filter(CourseCatalog.code == item["code"])
            .first()
        )

        if exists:
            skipped += 1
            continue

        course = CourseCatalog(
            code=item["code"],
            name=item["name"],
        )

        db.add(course)
        added += 1

    db.commit()

    print(f"Added: {added}")
    print(f"Skipped: {skipped}")

    db.close()


if __name__ == "__main__":
    seed()
