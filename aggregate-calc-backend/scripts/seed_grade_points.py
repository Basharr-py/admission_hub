from app.models.grade_point import OLevelGrade
from app.database.session import SessionLocal
from app.models import GradingSystem, GradePoint

db = SessionLocal()

grading_data = {
    "Standard WAEC": {
        "A1": 6,
        "B2": 5,
        "B3": 4,
        "C4": 3,
        "C5": 2,
        "C6": 1,
        "D7": 0,
        "E8": 0,
        "F9": 0,
    },

    "UNILORIN Scale": {
        "A1": 4.0,
        "B2": 3.6,
        "B3": 3.2,
        "C4": 2.8,
        "C5": 2.4,
        "C6": 2.0,
        "D7": 0,
        "E8": 0,
        "F9": 0,
    },

    "OAU Scale": {
        "A1": 2.0,
        "B2": 1.8,
        "B3": 1.6,
        "C4": 1.4,
        "C5": 1.2,
        "C6": 1.0,
        "D7": 0,
        "E8": 0,
        "F9": 0,
    },

    "UNIOSUN Scale": {
        "A1": 8,
        "B2": 7,
        "B3": 6,
        "C4": 5,
        "C5": 4,
        "C6": 3,
        "D7": 0,
        "E8": 0,
        "F9": 0,
    }
}

try:

    for system_name, grades in grading_data.items():

        grading_system = (
            db.query(GradingSystem)
            .filter(GradingSystem.name == system_name)
            .first()
        )

        if grading_system is None:
            print(f"❌ {system_name} not found.")
            continue

        for grade, points in grades.items():

            grade_enum = OLevelGrade(grade)

            exists = (
                db.query(GradePoint)
                .filter(
                    GradePoint.grading_system_id == grading_system.id,
                    GradePoint.grade == grade_enum,
                )
                .first()
            )

            if not exists:
                db.add(
                    GradePoint(
                        grading_system_id=grading_system.id,
                        grade=grade_enum,
                        points=points,
                    )
                )
    db.commit()

    print("✅ Grade points seeded successfully!")

finally:
    db.close()
