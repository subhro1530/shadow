import formidable from "formidable";
import fs from "fs";
import { exec } from "child_process";

export const config = {
  api: {
    bodyParser: false,
  },
};

const runPythonScript = (filePath) => {
  return new Promise((resolve, reject) => {
    exec(`python3 extract_text.py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error parsing the file" });
      return;
    }

    const filePath = files.pdf.filepath;

    try {
      const text = await runPythonScript(filePath);
      res.status(200).json({ text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing PDF" });
    }
  });
}
