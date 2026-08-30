from app.database.session import SessionLocal
from app.models import GradingSystem

grading_systems = [
    {
        "name": "Standard WAEC",
        "description": "Standard WAEC grading system (A1=6, B2=5, ..., C6=1)"
    },
    {
        "name": "UNILORIN Scale",
        "description": "4.0-point grading system used by UNILORIN, UNILAG, LAUTECH and FUHSI"
    },
    {
        "name": "OAU Scale",
        "description": "2.0-point grading system"
    },
    {
        "name": "UNIOSUN Scale",
        "description": "8.0-point grading system"
    }
]

db = SessionLocal()

try:
    for system in grading_systems:
        exists = (
            db.query(GradingSystem)
            .filter(GradingSystem.name == system["name"])
            .first()
        )

        if not exists:
            db.add(GradingSystem(**system))

    db.commit()
    print("✅ Grading systems seeded successfully!")

finally:
    db.close()
