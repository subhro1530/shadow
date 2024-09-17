import { useState } from "react";
import { Input, Button, VStack, Text, Box } from "@chakra-ui/react";

const InstaProfileFetcher = () => {
  const [username, setUsername] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://instagram-profile1.p.rapidapi.com/getprofile/${username}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "f33cddcc18mshf14c15ae56c57c3p19bb74jsn0b73d28bfc84",
            "x-rapidapi-host": "instagram-profile1.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the profile data");
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const createDocument = () => {
    const docContent = `Username: ${profileData.username}\nName: ${profileData.full_name}\nBiography: ${profileData.biography}\nFollowers: ${profileData.followers}\nFollowing: ${profileData.following}`;
    const blob = new Blob([docContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${username}_profile_info.txt`;
    link.click();
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Enter Instagram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="lg"
        focusBorderColor="blue.500"
        variant="filled"
      />
      <Button
        colorScheme="blue"
        onClick={fetchProfileData}
        size="lg"
        width="full"
      >
        Fetch Profile
      </Button>

      {error && <Text color="red.500">{error}</Text>}

      {profileData && (
        <Box>
          <Text fontWeight="bold">Username: {profileData.username}</Text>
          <Text>Name: {profileData.full_name}</Text>
          <Text>Bio: {profileData.biography}</Text>
          <Text>Followers: {profileData.followers}</Text>
          <Text>Following: {profileData.following}</Text>
          <Button mt={4} onClick={createDocument} colorScheme="green">
            Download Profile Info
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default InstaProfileFetcher;
