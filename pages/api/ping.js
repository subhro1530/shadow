import { exec } from "child_process";

export default function handler(req, res) {
  const { domain } = req.query;

  exec(`ping -c 1 ${domain}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Ping error:", stderr);
      return res
        .status(500)
        .json({ ip_address: "Unable to retrieve IP address" });
    }

    const ipRegex = /\((.*?)\)/; // Regex to extract IP address from ping output
    const match = stdout.match(ipRegex);

    if (match) {
      return res.status(200).json({ ip_address: match[1] }); // Extracted IP address
    } else {
      return res.status(404).json({ ip_address: "IP address not found" });
    }
  });
}
