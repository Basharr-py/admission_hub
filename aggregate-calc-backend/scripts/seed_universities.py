import json

from app.database.database import SessionLocal
from app.models.university import University

db = SessionLocal()

with open(
    "data/universities.json",
    "r",
    encoding="utf-8"
) as f:
    universities = json.load(f)

count = 0

for item in universities:

    exists = (
        db.query(University)
        .filter(
            University.short_name ==
            item["short_name"]
        )
        .first()
    )

    if exists:
        continue

    university = University(**item)

    db.add(university)

    count += 1

db.commit()

print(f"{count} universities inserted.")
