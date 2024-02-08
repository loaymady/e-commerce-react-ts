// import { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
// import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { clearCart, selectCart } from "../app/features/cartSlice";
import CartDrawerItem from "./CartDrawerItem";
import { IProduct } from "../interfaces";

const CartDrawer = () => {
  //   const btnRef = useRef();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);
  const onClose = () => dispatch(onCloseCartDrawerAction());

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      //   finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg={colorMode === "light" ? "white" : "#141214"}>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>

        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map((item: IProduct) => (
              <CartDrawerItem key={item.id} product={item} />
            ))
          ) : (
            <Text fontSize={"lg"}>Your cart is empty</Text>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            colorScheme="red"
            mr={3}
            onClick={() => dispatch(clearCart())}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
