import sys
import PyPDF2

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfFileReader(file)
            for page in range(reader.numPages):
                text += reader.getPage(page).extract_text()
    except Exception as e:
        text = str(e)
    return text

if __name__ == "__main__":
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
        extracted_text = extract_text_from_pdf(pdf_path)
        print(extracted_text)  # Ensure this outputs plain text
