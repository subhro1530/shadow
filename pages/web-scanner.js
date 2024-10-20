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

export default function WebScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setResult(null);

    // Validate the URL input
    if (!url || !isValidDomain(url)) {
      setResult({
        error: "Invalid domain. Please provide a valid domain name.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error scanning the website:", error);
      setResult({ error: "Failed to scan the website" });
    } finally {
      setLoading(false);
    }
  };

  const isValidDomain = (domain) => {
    // Basic domain validation (adjust as needed)
    const domainRegex =
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    return domainRegex.test(domain);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Website Vulnerability Scan Report", 10, 10);
    doc.text(`Open Ports: ${result.open_ports.join(", ")}`, 10, 20);
    doc.text(
      `Valid Directories: ${result.valid_directories.join(", ")}`,
      10,
      30
    );
    doc.save("scan_report.pdf");
  };

  return (
    <Box>
      <Container maxW="container.lg" textAlign="center" color="white">
        <VStack spacing={6}>
          <Heading as="h1" size="2xl" fontWeight="lighter">
            Website Vulnerability Scanner
          </Heading>
          <Text fontSize="xl" maxW="2xl" lineHeight="tall">
            Scan websites for open ports and valid directories. Just provide the
            domain name, and we will do the rest.
          </Text>

          {/* URL Input */}
          <Input
            placeholder="Enter Website Domain (e.g., example.com)"
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
            <Box mt={8} bg="white" color="black" p={4} borderRadius="md">
              {result.error ? (
                <Text color="red.500">{result.error}</Text>
              ) : (
                <>
                  <Text>Open Ports: {result.open_ports.join(", ")}</Text>
                  <Text>
                    Valid Directories: {result.valid_directories.join(", ")}
                  </Text>
                  <Button
                    size="lg"
                    mt={4}
                    px={8}
                    py={6}
                    bg="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(10px)"
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
