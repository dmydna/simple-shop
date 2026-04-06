import { DevProvider } from "../dev/contexts/DevContext.jsx";
import { CartProvider } from "../features/cart/contexts/CartContext.jsx";
import { CrudProvider } from "../features/crud/CrudContext.jsx";
import { ListingProvider } from "../features/listing/contexts/ListingContext.jsx";
import { ListingCrudProvider } from "../features/listing/contexts/ListingCrudContext.jsx";
import { ProductProvider } from "../features/product/contexts/ProductContext.jsx";
import { ProductCrudProvider } from "../features/product/contexts/ProductCrudContex.jsx";
import { ProfileProvider } from '../features/profile/contexts/ProfileContext.jsx';
import { UserProvider } from "../features/user/contexts/UserContext.jsx";
import { UserCrudProvider } from "../features/user/contexts/UserCrudContext.jsx";
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
