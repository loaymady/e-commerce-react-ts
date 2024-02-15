import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";
import profileDefault from "../../assets/profileDefault.jpg";

const AdminDashboard = () => {
  const username = CookieService.get("username");

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        w="xs"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image w="full" h={56} fit="cover" src={profileDefault} alt="avatar" />

        <Box py={5} textAlign="center">
          <Heading
            display="block"
            fontSize="2xl"
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
            mb={2}
          >
            {username}
          </Heading>
          <Text
            fontSize="sm"
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            Software Engineer
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
