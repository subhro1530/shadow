import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Icon,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa"; // Import icons
import Navbar from "../components/Navbar";

const Subscribe = () => {
  return (
    <>
      <Navbar />

      <Box
        p={10} // Increased padding for a spacious layout
        mt="80px" // Ensure space below fixed navbar
        // bg="gray.900" // Dark background for contrast
        color="white" // White text for better visibility
        borderRadius="md" // Rounded corners
      >
        <VStack spacing={8} align="center">
          <Heading as="h1" size="xl" color="purple.600">
            Subscribe
          </Heading>
          <Text fontSize="lg" textAlign="center" maxWidth="600px">
            Shadow delivers all the cybersecurity tools in one place. Whether
            you are a business owner or an individual, we provide comprehensive
            solutions to keep your digital life secure. Subscribe now to stay
            updated with the latest tools and features!
          </Text>

          <Text fontSize="lg" fontWeight="bold">
            Contact me through:
          </Text>
          <VStack spacing={4}>
            <Tooltip label="YouTube" aria-label="YouTube">
              <Link
                href="https://www.youtube.com/@acodernamedsubhro"
                isExternal
              >
                <Stack direction="row" spacing={2} align="center">
                  <Icon as={FaYoutube} boxSize={10} color="red.600" />
                </Stack>
              </Link>
            </Tooltip>
            <Tooltip label="LinkedIn" aria-label="LinkedIn">
              <Link
                href="https://www.linkedin.com/in/shaswata-saha-74b209251/"
                isExternal
              >
                <Stack direction="row" spacing={2} align="center">
                  <Icon as={FaLinkedin} boxSize={10} color="purple.500" />
                </Stack>
              </Link>
            </Tooltip>
            <Tooltip label="Gmail" aria-label="Gmail">
              <Link href="mailto:shaswata.ssaha@gmail.com">
                <Stack direction="row" spacing={2} align="center">
                  <Icon as={FaEnvelope} boxSize={10} color="purple.500" />
                </Stack>
              </Link>
            </Tooltip>
            <Tooltip label="GitHub" aria-label="GitHub">
              <Link href="https://github.com/subhro1530" isExternal>
                <Stack direction="row" spacing={2} align="center">
                  <Icon as={FaGithub} boxSize={10} color="purple.500" />
                </Stack>
              </Link>
            </Tooltip>
            <Tooltip label="WhatsApp" aria-label="WhatsApp">
              <Link href="https://wa.me/919674177512" isExternal>
                <Stack direction="row" spacing={2} align="center">
                  <Icon as={FaWhatsapp} boxSize={10} color="#25D366" />{" "}
                  {/* WhatsApp Icon */}
                </Stack>
              </Link>
            </Tooltip>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default Subscribe;
