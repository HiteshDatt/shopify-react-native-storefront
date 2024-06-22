import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import BuySDKClient from "../client";
import { LineItemsToAddType } from "../types";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  const { cart, setCart, isCartLoading, setIsCartLoading } = context;

  const addItemToCart = async (lineItemsToAdd: LineItemsToAddType[]) => {
    setIsCartLoading(true);
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
    setIsCartLoading(false);
  };

  const fetchLatestCartDetails = async () => {
    setIsCartLoading(true);
    if (cart?.id) {
      const res = await BuySDKClient.checkout.fetch(cart?.id);
      if (res?.order?.id) {
        setCart(null);
      } else {
        setCart(res);
      }
    }
    setIsCartLoading(false);
  };

  return { cart, addItemToCart, isCartLoading, fetchLatestCartDetails };
};

export default useCart;
