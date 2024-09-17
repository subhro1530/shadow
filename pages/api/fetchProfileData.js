import http from "http";
import { NextApiRequest, NextApiResponse } from "next";

const fetchProfileData = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "linkedin-data-api.p.rapidapi.com",
      port: null,
      path: `/get-profile-data-by-url?url=${encodeURIComponent(url)}`,
      headers: {
        "x-rapidapi-key": "f33cddcc18mshf14c15ae56c57c3p19bb74jsn0b73d28bfc84",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
      },
    };

    const req = http.request(options, (res) => {
      const chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        resolve(body);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { url } = req.body;
      const profileData = await fetchProfileData(url);
      res.status(200).json(JSON.parse(profileData));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
