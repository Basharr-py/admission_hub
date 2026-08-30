import json
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.course import Course
from app.models.course_catalog import CourseCatalog
from app.models.university import University

def generate_course_code(course_name: str, existing_codes: set) -> str:
    """
    Generate a unique course code from the initials.
    """

    words = [
        word
        for word in course_name.replace("&", "AND").split()
        if word.upper() not in {"AND", "OF", "IN", "FOR", "THE", "WITH"}
    ]

    code = "".join(word[0] for word in words).upper()

    # Fallback if the name is a single word
    if not code:
        code = course_name[:3].upper()

    unique_code = code
    counter = 2

    while unique_code in existing_codes:
        unique_code = f"{code}{counter}"
        counter += 1

    existing_codes.add(unique_code)

    return unique_code


def seed():
    db: Session = SessionLocal()

    with open(
        "courses.json",
        "r",
        encoding="utf-8",
    ) as f:
        mappings = json.load(f)

    universities = {
        u.short_name: u.id
        for u in db.query(University).all()
    }

    course_catalog = {
        c.name.strip().lower(): c
        for c in db.query(CourseCatalog).all()
    }  
    existing_codes = {
        c.code.upper()
        for c in db.query(CourseCatalog).all()
    } 

    added = 0
    skipped = 0
    missing = []

    for abbreviation, courses in mappings.items():
        print(f"\nProcessing {abbreviation} ({len(courses)} courses)")

        university_id = universities.get(abbreviation)

        if university_id is None:
            print(f"University not found: {abbreviation}")
            continue
        # print(f"✅ Found university: {universities.short_name}")

        for course_name in courses:
            print(f"Checking: {course_name}")

            normalized_name = course_name.strip().lower()

            catalog = course_catalog.get(normalized_name)

            if catalog is None:
                print(f"❌ Missing catalog: {course_name}")

                course_code = generate_course_code(
                    course_name.strip(),
                    existing_codes,
                )

                catalog = CourseCatalog(
                    name=course_name.strip(),
                    code=course_code,
                )

                db.add(catalog)
                db.flush()

                course_catalog[normalized_name] = catalog

                print(
                    f"Added to CourseCatalog: "
                    f"{course_name} ({course_code})"
                )

            exists = (
                db.query(Course)
                .filter(
                    Course.university_id == university_id,
                    Course.course_catalog_id == catalog.id,
                )
                .first()
            )

            if exists:
                print(f"⏩ Already exists: {course_name}")
                skipped += 1
                continue

            course = Course(
                university_id=university_id,
                course_catalog_id=catalog.id,
                name=catalog.name,
                min_jscore=140,
                current_cutoff=None,
            )
            print(f"✅ Inserting: {course_name}")

            db.add(course)
            added += 1

    db.commit()

    print(f"Added: {added}")
    print(f"Skipped: {skipped}")

    
    db.close()


if __name__ == "__main__":
    seed()
