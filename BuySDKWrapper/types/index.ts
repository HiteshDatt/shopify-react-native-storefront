type Cart = any;

type CartContextType = {
  cart: Cart | null;
  setCart: (args?: any) => void;
};

type LineItemsToAddType = {
  variantId: string;
  quantity: number;
};

type LineItemType = any;

export { CartContextType, Cart, LineItemsToAddType, LineItemType };
