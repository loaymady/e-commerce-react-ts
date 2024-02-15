import {
  AspectRatio,
  Box,
  Button,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
import imgFalBack from "../assets/img-placeholder.png";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const { id, attributes } = product;
  return (
    <Stack
      bg={"none"}
      rounded={"lg"}
      boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
      transition={".3s ease-in-out"}
      _hover={{ transform: "translateY(-10px)" }}
      spacing={{ base: "4", md: "5" }}
      p={{ base: "4", md: "4" }}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={
              attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url
                ? attributes.thumbnail.data.attributes.formats.thumbnail.url
                : imgFalBack
            }
            alt={attributes.title}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: "md", md: "xl" }}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {attributes.title}
          </Text>
          <Text color="purple.500">${attributes.price}</Text>
        </Stack>
      </Stack>
      <Stack align="center">
        <Button as={Link} to={`/products/${id}`} colorScheme="blue" w="full">
          View Details
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
