# Shadow: Social Media Investigator

> **Investigate and analyze social media data and documents for the presence of personally identifiable information (PII) and more.**

![Project Preview](#) <!-- Add a preview image or video link here -->

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)
8. [License](#license)

---

## Project Overview

Shadow is a comprehensive social media investigation tool designed to help users quickly and accurately analyze social media data for potential threats, suspicious activity, and personally identifiable information (PII). It also features automated document scanning to detect government-issued PII embedded in uploaded files. Shadow makes monitoring and investigation efficient and secure, with features tailored for cybersecurity professionals, investigators, and agencies.

---

## Features

- **Automated Social Media Search**: Efficiently search and analyze social media data across various platforms with precision.
- **Real-Time Monitoring**: Keep track of suspicious activities across multiple accounts and detect potential threats.
- **PII Extraction**: Analyze uploaded documents to identify government-issued PII, ensuring privacy compliance and security.
- **Secure Data Encryption**: All analysis and data transfers are secured with end-to-end encryption, ensuring that sensitive information remains confidential.
- **PDF Extraction**: Extract text, images, and other key data from uploaded PDF documents using Python scripts.
- **Advanced Web Scanning**: Tools to scan and scrape data from websites and identify potential security issues.
- **Spoofing Detection**: Detect suspicious account activities and protect users from identity theft or spoofing attempts.

---

## Technology Stack

- **Frontend**: Next.js, Chakra UI, Radix UI, Emotion.sh
- **Backend**: Node.js, Express.js
- **Document Processing**: Python (with libraries like `pdfplumber`, `pytesseract`, etc.)
- **Blockchain**: For secure transactions and data storage
- **APIs**: Wolfram LLM API for advanced AI-driven analysis
- **Real-Time Data**: WebSocket for monitoring live social media activities

---

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- Python 3.x
- Git

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/shadow-investigator.git
    ```

2. Install dependencies:
    ```bash
    cd shadow-investigator
    npm install
    ```

3. Set up environment variables by creating a `.env` file:
    ```bash
    NEXT_PUBLIC_WOLFRAM_APP_ID=your_wolfram_app_id
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

### Python Setup for PDF Extraction

1. Set up a Python virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

2. Install required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Start the PDF extraction service:
    ```bash
    python pdf_extractor.py
    ```

---

## Usage

### Social Media Investigation

1. Log in to Shadow.
2. Use the `Search` feature to analyze social media profiles, posts, and accounts for suspicious activity.
3. Monitor activities in real-time using the `Live Monitoring` feature.

### PII Extraction from Documents

1. Navigate to the `PDF Extractor` section.
2. Upload a document (PDF).
3. Shadow will automatically scan and extract government-issued PII embedded within the file.

### Advanced Features

- Use the `Web Scanner` to analyze websites for potential security vulnerabilities.
- Detect spoofing and other malicious activities using the `Spoofer` tool.

---

## Screenshots

![Screenshot 1](#)
![Screenshot 2](#)

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
