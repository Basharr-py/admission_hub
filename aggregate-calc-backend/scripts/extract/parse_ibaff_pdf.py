import pdfplumber
from pathlib import Path

RAW_PDF = Path("scripts/extract/ibass_brochure.pdf")
OUTPUT = Path("data/ibass_text.txt")


def main():
    with pdfplumber.open(RAW_PDF) as pdf:
        with open(OUTPUT, "w", encoding="utf-8") as f:
            for page_no, page in enumerate(pdf.pages, start=1):
                text = page.extract_text()

                f.write(f"\n{'=' * 80}\n")
                f.write(f"PAGE {page_no}\n")
                f.write(f"{'=' * 80}\n\n")

                if text:
                    f.write(text)
                else:
                    f.write("[NO TEXT FOUND]")

                f.write("\n\n")


if __name__ == "__main__":
    main()
