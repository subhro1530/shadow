import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShieldAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function FeaturesSection() {
  return (
    <Box
      bg="rgb(57, 47, 99,0.2)" // Purple background with transparency
      backdropFilter="blur(10px)" // Frosted glass effect
      borderRadius="20px" // Rounded corners
      py={20}
      px={8}
      color="white"
      textAlign="center"
    >
      <Heading as="h2" size="3xl" fontWeight="300" mb={10}>
        Key Features of Shadow
      </Heading>
      <SimpleGrid columns={[1, null, 3]} spacing={10}>
        <Feature
          icon={<FontAwesomeIcon icon={faSearch} size="3x" />}
          title="Automated Search"
          description="Quickly search and analyze social media data with accuracy and speed."
          link="#"
        />
        <Feature
          icon={<FontAwesomeIcon icon={faShieldAlt} size="3x" />}
          title="Secure"
          description="Keep your data safe with end-to-end encryption for all analysis."
          link="#"
        />
        <Feature
          icon={<FontAwesomeIcon icon={faEye} size="3x" />}
          title="Advanced Monitoring"
          description="Monitor suspicious activity across multiple accounts in real-time."
          link="#"
        />
      </SimpleGrid>
    </Box>
  );
}

function Feature({ icon, title, description, link }) {
  return (
    <VStack
      bg="rgba(255, 255, 255, 0.1)" // Semi-transparent background for glass effect
      backdropFilter="blur(10px)" // Frosted glass effect
      borderRadius="15px" // Rounded corners
      p={6}
      spacing={4}
      textAlign="center"
    >
      <Box mb={4}>{icon}</Box>
      <Heading as="h3" size="lg" mb={2}>
        {title}
      </Heading>
      <Text fontSize="md">{description}</Text>
      <Button
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(8px)"
        color="white"
        border="1px solid rgba(255, 255, 255, 0.4)"
        _hover={{
          bgGradient: "linear(to-r, purple.300, pink.400, blue.400)",
          color: "white",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        as="a"
        href={link}
      >
        Learn More
      </Button>
    </VStack>
  );
}
