// api/scan.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Domain is required" });
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/scan", {
        method: "POST", // Ensure this is a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error calling Flask API:", error);
      res.status(500).json({ error: "Failed to scan the website" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
