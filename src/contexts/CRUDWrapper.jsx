import { CrudProvider } from "../features/crud/CrudContext.jsx";
import { CarritoProvider } from "../features/cart/contexts/CartContext.jsx";
import { ListingProvider } from "../features/listing/contexts/ListingContext.jsx";
import { ListingCrudProvider } from "../features/listing/contexts/ListingCrudContext.jsx";
import { ProductProvider } from "../features/product/contexts/ProductContext.jsx";
import { ProductCrudProvider } from "../features/product/contexts/ProductCrudContex.jsx";
import { ProfileProvider } from '../features/profile/hooks/ProfileContext.jsx';
import { UserProvider } from "../features/user/contexts/UserContext.jsx";
import { UserCrudProvider } from "../features/user/contexts/UserCrudContext.jsx";
import { UIProvider } from "./UIContext";
import { DevProvider } from "../dev/contexts/DevContext.jsx";

// Este es tu Wrapper "CRUD"

export const CRUDWrapper = ({ children }) => {
  return (
    <UIProvider>
      <CrudProvider>
        <ListingProvider>
          <ProductProvider>
            <ProductCrudProvider>
              <CarritoProvider>
                <ListingCrudProvider>
                  <UserProvider>
                    <UserCrudProvider>
                    <ProfileProvider>
                      <DevProvider>
                      {children}
                      </DevProvider>
                    </ProfileProvider>
                    </UserCrudProvider>
                  </UserProvider>
                </ListingCrudProvider>
              </CarritoProvider>
            </ProductCrudProvider>
          </ProductProvider>
        </ListingProvider>
      </CrudProvider>
    </UIProvider>
  );
};
