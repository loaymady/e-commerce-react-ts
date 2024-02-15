import { Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Center
      display="flex"
      flexDir="column"
      textAlign="center"
      h="100vh"
      py={10}
      px={6}
    >
      <Heading
        display="inline-block"
        as="h2"
        size="4xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="40px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} fontSize="28px" mb={8}>
        The page you&apos;re looking for does not seem to exist
      </Text>
      <Button
        colorScheme="teal"
        as={Link}
        to={"/"}
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        width={"fit-content"}
        variant="solid"
      >
        Go to Home
      </Button>
    </Center>
  );
}
