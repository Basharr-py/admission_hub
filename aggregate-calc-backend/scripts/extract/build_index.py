import json
import re
from pathlib import Path

import fitz  # pip install pymupdf

PDF_PATH = Path("scripts/extract/ibass_brochure.pdf")
COURSE_CATALOG = Path("data/course_catalog.json")
OUTPUT = Path("data/university_programmes.json")


UNIVERSITIES = {
    "UNILORIN": "University of Ilorin",
    "OAU": "Obafemi Awolowo University",
    "UNILAG": "University of Lagos",
    "UI": "University of Ibadan",
    "ABSU": "Abia State University",
    "ADSU": "Adamawa State University",
    "AAUA": "Adekunle Ajasin University",
    "ABU": "Ahmadu Bello University",
    "AFIT": "Air Force Institute of Technology",
    "AKSU": "Akwa Ibom State University",
    "AE-FUNAI": "Alex Ekwueme Federal University, Ndufu-Alike",
    "BASUG": "Bauchi State University",
    "BMU": "Bayelsa Medical University",
    "BUK": "Bayero University Kano",
    "BSUM": "Benue State University",
    "BOSU": "Borno State University",
    "COOU": "Chukwuemeka Odumegwu Ojukwu University",
    "CUSTECH": "Confluence University of Science and Technology",
    "CRUTECH": "Cross River University of Technology",
    "DELSU": "Delta State University",
    "DOU": "Dennis Osadebay University",
    "EPU": "Eastern Palm University",
    "EBSU": "Ebonyi State University",
    "EKSU": "Ekiti State University",
    "EAUED": "Emmanuel Alayande University of Education",
    "ESUT": "Enugu State University of Science and Technology",
    "FUBK": "Federal University Birnin Kebbi",
    "FUD": "Federal University Dutse",
    "FUDMA": "Federal University Dutsin-Ma",
    "FUGASHUA": "Federal University Gashua",
    "FUGUS": "Federal University Gusau",
    "FUKASHERE": "Federal University Kashere",
    "FULAFIA": "Federal University Lafia",
    "FULOKOJA": "Federal University Lokoja",
    "FUNAI": "Federal University Ndifu-Alike",
    "FUOTUOKE": "Federal University Otuoke",
    "FUOYE": "Federal University Oye-Ekiti",
    "FUWUKARI": "Federal University Wukari",
    "FUAZ": "Federal University of Agriculture Zuru",
    "FUNAAB": "Federal University of Agriculture, Abeokuta",
    "FUHSA": "Federal University of Health Sciences Azare",
    "FUHSI": "Federal University of Health Sciences Ila-Orangun",
    "FUHSO": "Federal University of Health Sciences Otukpo",
    "FUPRE": "Federal University of Petroleum Resources, Effurun",
    "FUTA": "Federal University of Technology, Akure",
    "FUTMINNA": "Federal University of Technology, Minna",
    "FUTO": "Federal University of Technology, Owerri",
    "FUTD": "Federal University of Transportation Daura",
    "GSU": "Gombe State University",
    "IAUE": "Ignatius Ajuru University of Education",
    "IMSU": "Imo State University",
    "KASU": "Kaduna State University",
    "KUST": "Kano State University of Science and Technology",
    "KSUSTA": "Kebbi State University of Science and Technology",
    "KSU": "Kogi State University",
    "KWASU": "Kwara State University",
    "LAUTECH": "Ladoke Akintola University of Technology",
    "LASU": "Lagos State University",
    "MOUAU": "Michael Okpara University of Agriculture",
    "MAU": "Modibbo Adama University",
    "MAUSTECH": "Moshood Abiola University of Science and Technology",
    "NSUK": "Nasarawa State University",
    "NDU": "Niger Delta University",
    "NAUB": "Nigerian Army University Biu",
    "NDA": "Nigerian Defence Academy",
    "NMU": "Nigerian Maritime University",
    "UNIZIK": "Nnamdi Azikiwe University",
    "OOU": "Olabisi Onabanjo University",
    "UNIMED": "Ondo State University of Medical Sciences",
    "OAUSTECH": "Ondo State University of Science and Technology",
    "UNIOSUN": "Osun State University",
    "OYSCATECH": "Oyo State College of Agriculture and Technology",
    "PLASU": "Plateau State University",
    "PAAU": "Prince Abubakar Audu University",
    "RSU": "Rivers State University",
    "SSUES": "Shehu Shagari University of Education",
    "SSU": "Sokoto State University",
    "SLU": "Sule Lamido University",
    "TASUED": "Tai Solarin University of Education",
    "TSU": "Taraba State University",
    "UNIABUJA": "University of Abuja",
    "UAT": "University of Africa",
    "UNIBEN": "University of Benin",
    "UNICAL": "University of Calabar",
    "UNICROSS": "University of Cross River State",
    "UNIDEL": "University of Delta",
    "UNILESA": "University of Ilesa",
    "UNIMAID": "University of Maiduguri",
    "FUMS": "University of Medical Sciences Teaching Hospital Campus",
    "KBMU": "University of Medical Sciences, Kebbi",
    "UNN": "University of Nigeria",
    "UNIPORT": "University of Port Harcourt",
    "UNIUYO": "University of Uyo",
    "YSU": "Yobe State University",
    "YUMSUK": "Yusuf Maitama Sule University Kano",
    "ZACAS": "Zamfara State College of Arts and Science",
    "ZAMSUT": "Zamfara State University",
}

with open(COURSE_CATALOG, encoding="utf-8") as f:
    catalog = json.load(f)

course_names = sorted(
    [c["name"] for c in catalog],
    key=len,
    reverse=True,
)

result = {abbr: [] for abbr in UNIVERSITIES}

doc = fitz.open(PDF_PATH)

current_uni = None

for page_no in range(len(doc)):

    text = doc[page_no].get_text("text")

    text = re.sub(r"\s+", " ", text)

    lower = text.lower()

    for abbr, fullname in UNIVERSITIES.items():

        if fullname.lower() in lower:
            current_uni = abbr
            print(f"{abbr} found on page {page_no+1}")
            break

    if current_uni is None:
        continue

    for course in course_names:

        pattern = r"\b" + re.escape(course.lower()) + r"\b"

        if re.search(pattern, lower):

            if course not in result[current_uni]:
                result[current_uni].append(course)

with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=4)

print("Finished.")
