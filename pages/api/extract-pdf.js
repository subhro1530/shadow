import multer from "multer";
import fs from "fs";
import pdf from "pdf-parse";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};

const handler = async (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      res.status(500).json({ error: "Error uploading file" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;

    try {
      const text = await extractTextFromPDF(filePath);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ text });
    } catch (error) {
      console.error("Error processing PDF:", error);
      res.status(500).json({ error: "Error processing PDF" });
    } finally {
      // Clean up uploaded file
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });
    }
  });
};

export default handler;
