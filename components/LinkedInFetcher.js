import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, Spinner } from "@chakra-ui/react";

const LinkedInFetcher = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/fetchLinkedInProfile?url=${encodeURIComponent(profileUrl)}`
      );
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
    setLoading(false);
  };

  return (
    <Box p={6} boxShadow="lg" rounded="md" bg="gray.900" color="white">
      <VStack spacing={4}>
        <Input
          placeholder="Enter LinkedIn profile URL"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          bg="gray.700"
          color="white"
        />
        <Button colorScheme="purple" onClick={fetchProfileData}>
          Fetch Profile
        </Button>
        {loading && <Spinner />}
        {profileData && (
          <Box mt={4} textAlign="left">
            <Text fontWeight="bold">Name: {profileData.name}</Text>
            <Text>Title: {profileData.title}</Text>
            {/* Display more data from the profile */}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default LinkedInFetcher;
