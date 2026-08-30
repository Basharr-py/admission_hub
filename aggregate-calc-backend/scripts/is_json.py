import json
import os
import requests

BASE_URL = "https://ibass-api.jamb.gov.ng/api/ibass/institution/programmes"

HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Origin": "https://ibass.jamb.gov.ng",
    "Referer": "https://ibass.jamb.gov.ng/",
    "User-Agent": "Mozilla/5.0"
}

OUTPUT_FILE = "courses.json"


def load_courses():
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_courses(data):
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def scrape_university(university_id, university_code):
    all_courses = load_courses()

    if university_code not in all_courses:
        all_courses[university_code] = []

    existing = set(all_courses[university_code])

    page = 1

    while True:

        url = f"{BASE_URL}/{university_id}?page={page}"

        response = requests.post(
            url,
            headers=HEADERS,
            json={"course_search": ""},
            timeout=30
        )

        response.raise_for_status()

        result = response.json()

        programmes = result["data"]["data"]

        # No more pages
        if not programmes:
            break

        print(f"Page {page} - {len(programmes)} courses")

        for programme in programmes:
            title = programme["title"].strip()

            if title not in existing:
                existing.add(title)
                all_courses[university_code].append(title)

        page += 1

    all_courses[university_code].sort()

    save_courses(all_courses)

    print(f"\nFinished!")
    print(f"{university_code}: {len(all_courses[university_code])} courses saved.")


if __name__ == "__main__":
    scrape_university(
        university_id=668,
        university_code="UNIPORT"
    )
