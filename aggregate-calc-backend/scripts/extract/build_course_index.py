import json
from pathlib import Path
import fitz

PDF_PATH = Path("scripts/extract/ibass_brochure.pdf")
COURSE_FILE = Path("data/course_catalog.json")
OUTPUT_FILE = Path("data/course_index.json")


def load_courses():
    with open(COURSE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    courses = load_courses()

    index = {
        course["name"]: []
        for course in courses
    }

    doc = fitz.open(PDF_PATH)

    total = len(doc)

    for page_number, page in enumerate(doc, start=1):

        print(f"Scanning page {page_number}/{total}")

        text = page.get_text().lower()

        for course in courses:

            if course["name"].lower() in text:

                index[course["name"]].append(page_number)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=4)

    print("Done.")


if __name__ == "__main__":
    main()
