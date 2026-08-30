import json
import os
import time
import requests

UNIVERSITIES_FILE = "data/universities.json"
OUTPUT_FILE = "courses.json"

SEARCH_URL = "https://ibass-api.jamb.gov.ng/api/ibass/institutions?page=1"
COURSES_URL = "https://ibass-api.jamb.gov.ng/api/ibass/institution/programmes"

HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Origin": "https://ibass.jamb.gov.ng",
    "Referer": "https://ibass.jamb.gov.ng/",
    "User-Agent": "Mozilla/5.0"
}


def load_json(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)


def load_output():
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_output(data):
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def normalize(text):
    """Normalize strings for comparison."""
    return (
        text.lower()
        .replace(",", "")
        .replace(".", "")
        .replace("-", " ")
        .replace("&", "and")
        .strip()
    )


def get_ibass_id(university_name):
    """
    Search IBASS for a university and return its institution ID.
    """

    payload = {
        "inst_type": None,
        "inst_category": None,
        "inst_search": university_name
    }

    response = requests.post(
        SEARCH_URL,
        headers=HEADERS,
        json=payload,
        timeout=30
    )

    response.raise_for_status()

    result = response.json()

    institutions = result["data"]["data"]

    search = normalize(university_name)

    # First try partial match
    for institution in institutions:

        title = normalize(institution["title"])

        if search in title or title in search:
            return institution["id"]

    # Then try word matching
    search_words = set(search.split())

    for institution in institutions:

        title = normalize(institution["title"])

        if len(search_words.intersection(title.split())) >= 2:
            return institution["id"]

    return None


def scrape_courses(institution_id):
    """
    Scrape every page of courses for one institution.
    """

    page = 1
    courses = []

    while True:

        url = f"{COURSES_URL}/{institution_id}?page={page}"

        response = requests.post(
            url,
            headers=HEADERS,
            json={"course_search": ""},
            timeout=30
        )

        response.raise_for_status()

        result = response.json()

        programmes = result["data"]["data"]

        if not programmes:
            break

        print(f"      Page {page}: {len(programmes)}")

        for programme in programmes:
            courses.append(programme["title"].strip())

        # Stop if we've reached the last page
        if page >= result["data"]["last_page"]:
            break

        page += 1
        time.sleep(0.3)

    return sorted(set(courses))


def main():

    universities = load_json(UNIVERSITIES_FILE)

    output = load_output()

    for university in universities:

        short_name = university["short_name"]

        if short_name in output:
            print(f"Skipping {short_name} (already scraped)")
            continue

        print(f"\nSearching for {university['name']}")

        institution_id = get_ibass_id(university["name"])

        if institution_id is None:
            print("   ❌ Not found.")
            continue

        print(f"   Found ID: {institution_id}")

        courses = scrape_courses(institution_id)

        output[short_name] = courses

        save_output(output)

        print(f"   ✅ Saved {len(courses)} courses")

        time.sleep(1)


if __name__ == "__main__":
    main()
