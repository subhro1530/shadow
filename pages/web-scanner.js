import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Spinner,
  Select,
} from "@chakra-ui/react";

export default function WebScanner() {
  const [url, setUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [platform, setPlatform] = useState(""); // New state for platform
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, instructions, platform }), // Send platform as well
      });

      const data = await response.json();
      setResult(data.profile_data);
    } catch (error) {
      console.error("Error scanning the profile:", error);
      setResult({ error: "Failed to scan the profile" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Container maxW="container.lg" textAlign="center" color="white">
        <VStack spacing={6}>
          <Heading as="h1" size="2xl" fontWeight="lighter">
            Web Scanner
          </Heading>
          <Text fontSize="xl" maxW="2xl" lineHeight="tall">
            Scan through social media accounts and gather the data you need.
            Just provide the URL, select the platform, and we will do the rest.
          </Text>

          {/* URL Input */}
          <Input
            placeholder="Enter Social Media Profile URL"
            size="lg"
            variant="outline"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.4)"
            color="white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* Platform Dropdown */}
          <Select
            placeholder="Select Social Media Platform"
            size="lg"
            variant="outline"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.4)"
            color="white"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </Select>

          {/* Additional Instructions */}
          <Textarea
            placeholder="Additional Instructions (Optional)"
            size="lg"
            variant="outline"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.4)"
            color="white"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            mt={4}
            rows={4}
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
                  <Text>Name: {result.name}</Text>
                  <Text>Bio: {result.bio}</Text>
                  {/* Add more fields as needed */}
                </>
              )}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
