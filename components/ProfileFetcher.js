import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Container,
  Input,
  Image,
  Spinner,
  Select,
  useToast,
} from "@chakra-ui/react";
import LinkedInFetcher from "./LinkedInFetcher";
import InstaProfileFetcher from "./InstaProfileFetcher";

const ProfileFetcher = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const toast = useToast();

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      mt="70px"
      bgGradient="linear(to-r, blue.900, purple.900)"
      color="white"
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "rgba(0, 0, 0, 0.7)",
        zIndex: 1,
      }}
    >
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={2}
        textAlign="center"
        py={10}
      >
        <VStack spacing={6}>
          <Select
            placeholder="Select Social Media Platform"
            onChange={handlePlatformChange}
            size="lg"
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
          >
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
          </Select>

          {selectedPlatform === "linkedin" && <LinkedInFetcher />}
          {selectedPlatform === "instagram" && <InstaProfileFetcher />}
        </VStack>
      </Container>
    </Box>
  );
};

export default ProfileFetcher;
