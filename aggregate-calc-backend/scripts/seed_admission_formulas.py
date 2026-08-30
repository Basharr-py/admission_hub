from app.database.session import SessionLocal
from app.models import University, GradingSystem, AdmissionFormula

db = SessionLocal()

formula_data = [
    {
        "university": "UNILORIN",
        "grading_system": "UNILORIN Scale",
        "jamb_weight": 50,
        "olevel_weight": 20,
        "putme_weight": 30,
        "jamb_divisor": 8,
        "putme_divisor": 10/3,
        "max_olevel_points": 20,
        "putme_max_score": 100,
    },
    {
        "university": "OAU",
        "grading_system": "OAU Scale",
        "jamb_weight": 50,
        "olevel_weight": 10,
        "putme_weight": 40,
        "jamb_divisor": 8,
        "putme_divisor": 1,
        "max_olevel_points": 10,
        "putme_max_score": 40,
    },
    {
        "university": "UNILAG",
        "grading_system": "UNILORIN Scale",
        "jamb_weight": 50,
        "olevel_weight": 20,
        "putme_weight": 30,
        "jamb_divisor": 8,
        "putme_divisor": 1,
        "max_olevel_points": 20,
        "putme_max_score": 30,
    },
]

try:
    for data in formula_data:
        university = (
            db.query(University)
            .filter(University.short_name == data["university"])
            .first()
        )

        if not university:
            raise ValueError(f"University {data['university']} not found")

        grading_system = (
            db.query(GradingSystem)
            .filter(GradingSystem.name == data["grading_system"])
            .first()
        )

        if not grading_system:
            raise ValueError(
                f"Grading system {data['grading_system']} not found"
            )

        existing = (
            db.query(AdmissionFormula)
            .filter(
                AdmissionFormula.university_id == university.id
            )
            .first()
        )

        if existing:
            continue

        formula = AdmissionFormula(
            university_id=university.id,
            grading_system_id=grading_system.id,
            jamb_weight=data["jamb_weight"],
            olevel_weight=data["olevel_weight"],
            putme_weight=data["putme_weight"],
            jamb_divisor=data["jamb_divisor"],
            putme_divisor=data["putme_divisor"],
            max_olevel_points=data["max_olevel_points"],
            putme_max_score=data["putme_max_score"],
        )

        db.add(formula)

    db.commit()
    print("Admission formulas seeded successfully.")

except Exception:
    db.rollback()
    raise

finally:
    db.close()
