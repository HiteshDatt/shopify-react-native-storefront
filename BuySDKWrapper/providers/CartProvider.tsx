import { useState } from "react";
import CartContext from "../contexts/CartContext";
import { Cart } from "../types";

export function CartProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
