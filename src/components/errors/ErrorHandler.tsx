import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <IoMdClose color={"white"} size={50} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={12}>
        {statusCode} - {title}
      </Heading>
      <Center gap="20px">
        <Button
          colorScheme="teal"
          as={Link}
          to={"/"}
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          width={"fit-content"}
          variant="solid"
        >
          Home
        </Button>
        <Button
          colorScheme="teal"
          as={Link}
          to={pathname}
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          width={"fit-content"}
          variant="solid"
        >
          Refresh
        </Button>
      </Center>
    </Box>
  );
};

export default ErrorHandler;
