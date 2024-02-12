import { Button, Image, Stack, Text, Flex, Divider } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";
import { IProduct } from "../interfaces";
import imgFalBack from "../assets/img-placeholder.png";

interface IProps {
  product: IProduct;
}

const CartDrawerItem = ({ product }: IProps) => {
  const dispatch = useDispatch();
  const { attributes, quantity } = product;
  const { title, price, thumbnail } = attributes;
  return (
    <>
      <Flex alignItems={"center"} mb={3} py={2}>
        <Image
          src={
            thumbnail?.data?.attributes?.formats?.thumbnail?.url
              ? thumbnail?.data.attributes.formats.thumbnail.url
              : imgFalBack
          }
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded="full"
          objectFit={"cover"}
          mr={5}
        />
        <Stack w="full">
          <Text fontSize={"sm"}>Title: {title}</Text>
          <Text fontSize={"sm"}>Price: ${price}</Text>
          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          <Button
            leftIcon={<BsTrash />}
            variant="outline"
            colorScheme="red"
            mt={2}
            size="md"
            w="full"
            onClick={() => dispatch(removeFromCart(product))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>

      <Divider />
    </>
  );
};

export default CartDrawerItem;
