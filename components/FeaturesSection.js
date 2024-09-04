import { Box, SimpleGrid, Heading, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShieldAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function FeaturesSection() {
  return (
    <Box bg="purpleDark.100" py={20} color="white" textAlign="center">
      <Heading as="h2" size="xl" mb={10}>
        Key Features of Shadow
      </Heading>
      <SimpleGrid columns={[1, null, 3]} spacing={10} px={8}>
        <Feature
          icon={<FontAwesomeIcon icon={faSearch} size="3x" />}
          title="Automated Search"
          description="Quickly search and analyze social media data with accuracy and speed."
        />
        <Feature
          icon={<FontAwesomeIcon icon={faShieldAlt} size="3x" />}
          title="Secure"
          description="Keep your data safe with end-to-end encryption for all analysis."
        />
        <Feature
          icon={<FontAwesomeIcon icon={faEye} size="3x" />}
          title="Advanced Monitoring"
          description="Monitor suspicious activity across multiple accounts in real-time."
        />
      </SimpleGrid>
    </Box>
  );
}

function Feature({ icon, title, description }) {
  return (
    <VStack>
      <Box mb={4}>{icon}</Box>
      <Heading as="h3" size="lg" mb={2}>
        {title}
      </Heading>
      <Text fontSize="md">{description}</Text>
    </VStack>
  );
}
