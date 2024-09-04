import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Adjust video playback speed or other settings
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slows down the video playback
    }
  }, []);

  return (
    <Box
      position="relative"
      height="100vh"
      overflow="hidden"
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "rgba(0, 0, 0, 0.4)", // Adding a dark overlay for better text visibility
        zIndex: 1,
      }}
    >
      {/* Fixed Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed", // Make video position fixed
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/vdo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Parallax Effect */}
      <Box
        position="relative"
        zIndex={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        bgAttachment="fixed"
        bgPosition="center"
        bgSize="cover"
      >
        <Container maxW="container.xl" textAlign="center">
          <VStack spacing={6}>
            <Heading
              as="h1"
              size="3xl"
              color="white"
              textTransform="uppercase"
              fontWeight="lighter" // Reduced font weight for the heading
            >
              Shadow: Social Media Investigator
            </Heading>
            <Text fontSize="2xl" color="white" maxW="2xl" lineHeight="tall">
              Investigate and monitor social media activities with automated
              tools.
            </Text>
            <Button
              size="lg"
              px={8}
              py={6}
              bg="rgba(255, 255, 255, 0.1)" // Semi-transparent background for glass effect
              backdropFilter="blur(10px)" // Frosted glass effect
              color="white"
              fontWeight="bold"
              _hover={{
                bgGradient: "linear(to-r, purple.300, pink.400, blue.400)",
                color: "white",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Optional hover shadow effect
              }}
              border="1px solid rgba(255, 255, 255, 0.4)" // Optional border for the button
            >
              Learn More
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
