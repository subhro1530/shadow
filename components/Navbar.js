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
          height="45px" // Adjust size as needed
        />
        <Spacer />
        <Flex gap={6} alignItems="center">
          {/* Updated Link styles */}
          <Link
            href="/pdf-extraction"
            color="white"
            fontSize="lg"
            position="relative"
            _hover={{
              color: "purple.300",
              _after: {
                width: "100%", // Full width underline
              },
            }}
            _after={{
              content: `""`,
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "2px",
              bg: "purple.300",
              transition: "width 0.3s ease-in-out",
            }}
          >
            PDF Extractor
          </Link>
          <Link
            href="#"
            color="white"
            fontSize="lg"
            position="relative"
            _hover={{
              color: "purple.300",
              _after: {
                width: "100%",
              },
            }}
            _after={{
              content: `""`,
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "2px",
              bg: "purple.300",
              transition: "width 0.3s ease-in-out",
            }}
          >
            Web Scanner
          </Link>
          <Link
            href="#"
            color="white"
            fontSize="lg"
            position="relative"
            _hover={{
              color: "purple.300",
              _after: {
                width: "100%",
              },
            }}
            _after={{
              content: `""`,
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "2px",
              bg: "purple.300",
              transition: "width 0.3s ease-in-out",
            }}
          >
            Spoofer
          </Link>
          <Link
            href="#"
            color="white"
            fontSize="lg"
            position="relative"
            _hover={{
              color: "purple.300",
              _after: {
                width: "100%",
              },
            }}
            _after={{
              content: `""`,
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "2px",
              bg: "purple.300",
              transition: "width 0.3s ease-in-out",
            }}
          >
            Scripts
          </Link>

          {/* Updated Button styles */}
          <Button
            bg="rgba(255, 255, 255, 0.2)" // Glass effect background
            backdropFilter="blur(10px)" // Add glassy background blur
            border="1px solid rgba(255, 255, 255, 0.3)" // Subtle border
            color="white"
            _hover={{
              bgGradient: "linear(to-r, purple.400, purple.600)", // Gradient on hover
              border: "1px solid purple.600", // Border on hover
            }}
            transition="all 0.3s ease-in-out"
          >
            Subscribe
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
