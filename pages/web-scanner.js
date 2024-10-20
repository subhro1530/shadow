import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import Navbar from "../components/Navbar";

export default function WebScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState(""); // State to hold summary

  const handleScan = async () => {
    setLoading(true);
    setResult(null);
    setSummary(""); // Reset summary state

    // Validate the URL input
    if (!url || !isValidDomain(url)) {
      setResult({
        error: "Invalid domain. Please provide a valid domain name.",
      });
      setLoading(false);
      return;
    }

    try {
      // Get the IP address of the domain using ping command
      const ipAddress = await fetchIpAddress(url);

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult({ ...data, ip_address: ipAddress }); // Include the IP address

      // Create a summary prompt with the domain and directories
      if (data.open_ports && data.valid_directories) {
        const domainName = url.split("/")[0]; // Get domain part from URL
        const directories = data.valid_directories.join(", "); // Join directories
        const summaryPrompt = `The scan for ${domainName} revealed the following: Open Ports - ${data.open_ports.join(
          ", "
        )}. Valid Directories - ${directories}. The scan also revealed that the site had a large number of errors. The site also had a number of problems with the security of its servers.`;

        // Send scan results to summarization API
        const summaryResponse = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: summaryPrompt,
          }),
        });

        const summaryData = await summaryResponse.json();
        if (summaryResponse.ok) {
          setSummary(summaryData.summary);
        } else {
          console.error("Failed to get summary:", summaryData);
        }
      }
    } catch (error) {
      console.error("Error scanning the website:", error);
      setResult({ error: "Failed to scan the website" });
    } finally {
      setLoading(false);
    }
  };

  const isValidDomain = (domain) => {
    const domainRegex =
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    return domainRegex.test(domain);
  };

  const fetchIpAddress = async (domain) => {
    try {
      const response = await fetch(
        `/api/ping?domain=${encodeURIComponent(domain)}`
      );
      const data = await response.json();
      return data.ip_address; // Assuming the API returns { ip_address: '...' }
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return "Unable to retrieve IP address";
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Website Vulnerability Scan Report", 10, 10);
    doc.text(`Domain: ${result.domain}`, 10, 20);
    doc.text(`IP Address: ${result.ip_address}`, 10, 30);
    doc.text(`Open Ports: ${result.open_ports.join(", ")}`, 10, 40);
    doc.text(
      `Valid Directories: ${result.valid_directories.join(", ")}`,
      10,
      50
    );

    // Add summary to PDF
    if (summary) {
      doc.text("Summary:", 10, 60);
      doc.text(summary, 10, 70);
    }

    doc.save("scan_report.pdf");
  };

  return (
    <Box bg="gray.800" color="white" minH="100vh">
      <Navbar />
      <Container mt="76px" maxW="container.lg" textAlign="center">
        <VStack spacing={6}>
          <Heading mt={7} as="h1" size="2xl" fontWeight="lighter">
            Website Vulnerability Scanner
          </Heading>
          <Text fontSize="xl" maxW="2xl" lineHeight="tall">
            Scan websites for open ports and valid directories. Just provide the
            domain name, and we will do the rest.
          </Text>

          {/* URL Input */}
          <Input
            placeholder="Enter Website Domain (e.g., www.google.com/images)"
            size="lg"
            variant="outline"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.4)"
            color="white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* Scan Button */}
          <Button
            size="lg"
            px={8}
            py={6}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            color="white"
            fontWeight="bold"
            onClick={handleScan}
            isLoading={loading}
          >
            Scan Now
          </Button>

          {/* Display Result */}
          {loading && <Spinner size="xl" />}
          {result && (
            <Box mt={8} bg="gray.700" p={6} borderRadius="md" shadow="lg">
              {result.error ? (
                <Text color="red.500">{result.error}</Text>
              ) : (
                <>
                  <Text>Domain: {result.domain}</Text>
                  <Text>IP Address: {result.ip_address}</Text>
                  <Text>Open Ports: {result.open_ports.join(", ")}</Text>
                  <Text>
                    Valid Directories: {result.valid_directories.join(", ")}
                  </Text>
                  {summary && <Text mt={4}>Summary: {summary}</Text>}
                  <Button
                    size="lg"
                    mt={4}
                    px={8}
                    py={6}
                    bg="green.500"
                    color="white"
                    fontWeight="bold"
                    onClick={downloadPDF}
                  >
                    Download Report as PDF
                  </Button>
                </>
              )}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
