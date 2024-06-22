import { useState } from "react";
import CartContext from "../contexts/CartContext";
import { Cart } from "../types";

export function CartProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isCartLoading,
        setIsCartLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
