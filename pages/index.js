import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection"; // Assuming this will be another component

export default function Home() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </Box>
  );
}
