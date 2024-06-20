import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import BuySDKClient from "../client";
import { LineItemsToAddType } from "../types";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  const { cart, setCart } = context;

  const addItemToCart = async (lineItemsToAdd: LineItemsToAddType[]) => {
    if (cart?.id) {
      const res = await BuySDKClient.checkout.addLineItems(
        cart?.id,
        lineItemsToAdd
      );
      setCart(res);
    } else {
      const res = await BuySDKClient.checkout.create();
      const checkoutID = res?.id;
      const addItemRes = await BuySDKClient.checkout.addLineItems(
        checkoutID,
        lineItemsToAdd
      );
      setCart(addItemRes);
    }
  };

  return { cart, addItemToCart };
};

export default useCart;
