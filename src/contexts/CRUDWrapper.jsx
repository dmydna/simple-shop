import { CartProvider } from "../features/cart/contexts/CartContext.jsx";
import { ListingProvider } from "../features/listing/contexts/ListingContext.jsx";
import { UIProvider } from "./UIContext";

// Este es tu Wrapper "CRUD"

export const CRUDWrapper = ({ children }) => {
  return (
    <UIProvider>
      <ListingProvider>
        <CartProvider>
            {children}
        </CartProvider>
      </ListingProvider>
    </UIProvider>
  );
};
