import sys
import pdfplumber

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    extracted_text = extract_text_from_pdf(pdf_path)
    print(extracted_text)
