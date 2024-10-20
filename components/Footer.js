import {
  Box,
  Text,
  VStack,
  Link,
  Icon,
  Stack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa"; // Import icons

const Footer = () => {
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box
      bg="gray.900" // Dark background for contrast
      color="white" // White text for visibility
      p={5} // Padding for the footer
      textAlign="center"
    >
      <VStack spacing={4} align="center">
        <Text fontSize={textSize}>
          &copy; {new Date().getFullYear()} Shadow. All rights
          reserved.
        </Text>

        <HStack spacing={6}>
          <Link href="https://www.youtube.com/@acodernamedsubhro" isExternal>
            <Icon as={FaYoutube} boxSize={6} color="red.600" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/shaswata-saha-74b209251/"
            isExternal
          >
            <Icon as={FaLinkedin} boxSize={6} color="purple.500" />
          </Link>
          <Link href="mailto:shaswata.ssaha@gmail.com">
            <Icon as={FaEnvelope} boxSize={6} color="purple.500" />
          </Link>
          <Link href="https://github.com/subhro1530" isExternal>
            <Icon as={FaGithub} boxSize={6} color="purple.500" />
          </Link>
          <Link href="https://wa.me/919674177512" isExternal>
            <Icon as={FaWhatsapp} boxSize={6} color="#25D366" />
          </Link>
        </HStack>

        <HStack spacing={6} mt={4}>
          <Link href="/" fontSize={textSize}>
            Home
          </Link>
          <Link href="/subscribe" fontSize={textSize}>
            Subscribe
          </Link>
          {/* Add any additional links you want */}
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;
