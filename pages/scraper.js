import { Box } from "@chakra-ui/react";
import ProfileFetcher from "../components/ProfileFetcher";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import InstaProfileFetcher from "../components/InstaProfileFetcher";

const ProfileFetcherPage = () => {
  return (
    <Box>
      <Navbar />
      <ProfileFetcher />
    </Box>
  );
};

export default ProfileFetcherPage;
