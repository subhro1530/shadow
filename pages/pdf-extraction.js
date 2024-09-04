import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  useToast,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { CopyIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function PdfExtractionPage() {
  const [pdfData, setPdfData] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const response = await fetch("/api/extract-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setPdfData(data.text);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to extract text from PDF.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "No File",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const copyToClipboard = () => {
    if (pdfData) {
      navigator.clipboard.writeText(pdfData);
      toast({
        title: "Copied!",
        description: "Text has been copied to clipboard.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleBackClick = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <Box bg="purple.900" color="white" minHeight="100vh" py={12}>
      <Container maxW="container.md" textAlign="center">
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          onClick={handleBackClick}
          colorScheme="whiteAlpha"
          variant="outline"
          position="absolute"
          top={4}
          left={4}
          zIndex={1}
        />
        <VStack spacing={8} mt={10}>
          <Heading size="3xl" fontWeight="light">
            PDF Extraction
          </Heading>
          <Text fontSize="lg" maxW="2xl">
            Upload a PDF file to extract its text content. The result will be
            displayed on the same page in a readable format.
          </Text>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            variant="flushed"
            mb={4}
            bg="rgba(255, 255, 255, 0.1)"
            borderColor="whiteAlpha.300"
            color="white"
          />
          <Button
            colorScheme="purple"
            variant="solid"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Upload and Extract"}
          </Button>
          {pdfData && (
            <Box
              mt={8}
              p={4}
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(10px)"
              borderRadius="md"
              maxW="2xl"
              mx="auto"
              textAlign="left"
              color="white"
            >
              <Text whiteSpace="pre-wrap">{pdfData}</Text>
              <IconButton
                aria-label="Copy to clipboard"
                icon={<CopyIcon />}
                onClick={copyToClipboard}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
                colorScheme="white"
                variant="outline"
                mt={4}
              />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
