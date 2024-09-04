import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

export default function PdfExtractor() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const toast = useToast();

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!pdfFile) {
      toast({
        title: "No file selected.",
        description: "Please choose a PDF file to upload.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setExtractedText(data.text || "No text extracted");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast({
        title: "Error",
        description: "There was an error extracting the PDF text.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="purple.800" p={8} rounded="lg" textAlign="center" color="white">
      <VStack spacing={6}>
        <Text fontSize="xl" fontWeight="bold">
          PDF Text Extractor
        </Text>
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          bg="white"
          color="black"
        />
        <Button
          onClick={handleFileUpload}
          bg="purple.400"
          color="white"
          _hover={{ bg: "purple.600" }}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Extract Text"}
        </Button>
        {extractedText && (
          <Box p={4} bg="purple.700" rounded="md" textAlign="left">
            <Text whiteSpace="pre-wrap">{extractedText}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
