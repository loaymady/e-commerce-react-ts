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
import { IProduct } from "../interfaces";
import imgFalBack from "../assets/img-placeholder.png";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const { id, attributes } = product;
  const { colorMode } = useColorMode();

  return (
    <Card
      bg={"none"}
      rounded={"lg"}
      border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
      boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
      transition={".3s ease-in-out"}
      _hover={{ transform: "translateY(-20px)" }}
    >
      <CardBody>
        <Image
          src={
            attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url
              ? attributes.thumbnail.data.attributes.formats.thumbnail.url
              : imgFalBack
          }
          alt={attributes.title}
          rounded="lg"
          mx={"auto"}
          objectFit={"cover"}
          height={60}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={2}>
            {attributes.title}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"} minH={63}>
            {attributes.description}
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
            ${attributes.price}
          </Text>
        </Stack>
        <Button
          as={Link}
          to={`/products/${id}`}
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
