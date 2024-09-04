import { Box, Flex, Link, Button, Spacer, Image } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      width="100%"
      bg="rgba(255, 255, 255, 0.1)" // Semi-transparent background for glass effect
      backdropFilter="blur(10px)" // Frosted glass effect
      zIndex="1000"
      px={4}
      py={4}
    >
      <Flex alignItems="center">
        <Image
          src="/shadow.png" // Replace with the path to your logo
          alt="Shadow Logo"
          height="45px"// Adjust size as needed
        />
        <Spacer />
        <Flex gap={6} alignItems="center">
          <Link
            href="#"
            color="white"
            fontSize="lg"
            _hover={{ color: "purple.300" }}
          >
            PDF Extractor
          </Link>
          <Link
            href="#"
            color="white"
            fontSize="lg"
            _hover={{ color: "purple.300" }}
          >
            Web Scanner
          </Link>
          <Link
            href="#"
            color="white"
            fontSize="lg"
            _hover={{ color: "purple.300" }}
          >
            Spoofer
          </Link>
          <Link
            href="#"
            color="white"
            fontSize="lg"
            _hover={{ color: "purple.300" }}
          >
            Scripts
          </Link>
          <Button
            colorScheme="purple"
            variant="solid"
            _hover={{ bg: "purple.300" }}
          >
            Subscribe
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
