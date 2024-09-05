export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn", // Replace with your model
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Secure token
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      const data = await response.json();

      // Log the entire response to see its structure
      console.log("Hugging Face API response:", data);

      if (response.ok) {
        // Log what you are sending back to the client
        console.log("Summary:", data[0].summary_text);
        res.status(200).json({ summary: data[0].summary_text });
      } else {
        console.error("Error response from Hugging Face:", data);
        res
          .status(500)
          .json({ error: "Failed to summarize the text.", details: data });
      }
    } catch (error) {
      console.error("Error during summarization:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
