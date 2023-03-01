import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface ShopContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}
export const ShopContext = createContext<ShopContextValue | undefined>(
  undefined
);

export function useShopContext() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw Error("Ooops - we do not seem to b inside he provider");
  }
  return context;
}
export function ShopProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);
  function removeItem(productId: number, quantity: number) {
    if (!basket) return;
    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setBasket((prevState) => {
        return { ...prevState!, items };
      });
    }
  }
  return (
    <ShopContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </ShopContext.Provider>
  );
}
