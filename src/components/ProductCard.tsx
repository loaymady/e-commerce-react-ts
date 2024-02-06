import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const { colorMode } = useColorMode();

  return (
    <Card
      bg={"none"}
      rounded={"lg"}
      border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
      // boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
      // transition={".3s ease-in-out"}
      // _hover={{ transform: "translateY(-20px)" }}
    >
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          rounded="lg"
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={2}>
            Living room Sofa
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
            $450
          </Text>
        </Stack>
        <Button
          as={Link}
          to={`/products/1`}
          size={"xl"}
          variant="outline"
          border={"none"}
          py={5}
          overflow={"hidden"}
          w={"full"}
          color={"#e6f3fd"}
          bg={"#6b28ef"}
          _hover={{
            bg: "#570af2",
            border: "transparent",
          }}
          mt={6}
        >
          View Details
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
