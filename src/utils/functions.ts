import { IProduct } from "../interfaces";

export const addItemToShoppingCart = (
  cartItems: IProduct[],
  actionPayload: IProduct
) => {
  const exists = cartItems.find(
    (item: IProduct) => item.id === actionPayload.id
  );

  if (exists) {
    return cartItems.map((item: IProduct) =>
      item.id === actionPayload.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...actionPayload, quantity: 1 }];
};

export const removeItemFromShoppingCart = (
  cartItems: IProduct[],
  actionPayload: IProduct
) => {
  if (actionPayload.quantity > 1) {
    return cartItems.map((item: IProduct) =>
      item.id === actionPayload.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  if (actionPayload.quantity === 1) {
    return cartItems.filter((item: IProduct) => item.id !== actionPayload.id);
  }
  return cartItems;
};
