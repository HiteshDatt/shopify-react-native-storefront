import { createContext } from "react";
import { CartContextType } from "../types";

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  isCartLoading: false,
  setIsCartLoading: () => {},
});

export default CartContext;