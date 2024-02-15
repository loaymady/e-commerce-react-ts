import {
  Image,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeImg from "../assets/home.jpg";

const HomePage = () => {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacing={0}
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        pr={{
          base: 4,
          md: 8,
          lg: 10,
        }}
        py={24}
        zIndex={3}
      >
        <Heading
          as={"h1"}
          mb={4}
          fontSize={{
            base: "4xl",
            md: "4xl",
            lg: "5xl",
          }}
          fontWeight="bold"
          color="brand.600"
          _dark={{
            color: "gray.300",
          }}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Stay productive and get more work done!
        </Heading>
        <Text
          pr={{
            base: 0,
            lg: 16,
          }}
          mb={4}
          fontSize="lg"
          color="brand.600"
          _dark={{
            color: "gray.400",
          }}
          letterSpacing="wider"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam iusto
          aliquam ad ratione dolorem quaerat nesciunt maiores nihil magnam
          harum!
        </Text>
        <Box display="inline-flex" rounded="md" shadow="md">
          <Button
            as={Link}
            to="/products"
            mt={2}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={5}
            py={3}
            border="solid transparent"
            fontWeight="bold"
            w="full"
            rounded="md"
            _light={{
              color: "white",
            }}
            bg="#3c4178"
            _dark={{
              bg: "#4d5499",
            }}
            _hover={{
              bg: "#2a2f57",
              _dark: {
                bg: "#3c4178",
              },
            }}
          >
            Explore Products
          </Button>
        </Box>
      </Flex>
      <Flex bg="brand.400">
        <Image
          src={HomeImg}
          alt="HomeImg"
          fit="cover"
          w="full"
          h={{
            base: 64,
            md: "full",
          }}
          bg="gray.100"
          loading="lazy"
        />
      </Flex>
    </SimpleGrid>
  );
};

export default HomePage;
