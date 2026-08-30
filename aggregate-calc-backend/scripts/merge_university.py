import json
from pathlib import Path

DATA_DIR = Path("data")

merged = []

for file in sorted(DATA_DIR.glob("universities_batch*.json")):
    print(f"Reading {file.name}")

    with open(file, "r", encoding="utf-8") as f:
        merged.extend(json.load(f))

# Remove duplicates using short_name
unique = {}

for university in merged:
    unique[university["short_name"]] = university

merged = sorted(
    unique.values(),
    key=lambda x: x["name"]
)

output = DATA_DIR / "universities.json"

with open(output, "w", encoding="utf-8") as f:
    json.dump(
        merged,
        f,
        indent=4,
        ensure_ascii=False
    )

print(f"Merged {len(merged)} universities.")
