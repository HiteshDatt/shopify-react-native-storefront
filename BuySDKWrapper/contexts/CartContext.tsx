import { createContext } from "react";
import { CartContextType } from "../types";

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
});

export default CartContext;