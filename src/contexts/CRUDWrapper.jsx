import { BrowserRouter } from "react-router-dom";
import { ListingProvider } from "../features/listing/contexts/ListingContext.jsx";
import { ClientProvider } from "../features/client/ClientContext.jsx";
import { CarritoProvider } from "../features/cart/contexts/CartContext.jsx";
import { UIProvider } from "./UIContext";
import { ListingCrudProvider } from "../features/listing/contexts/ListingCrudContext.jsx";
import { UserProvider } from '../features/profile/hooks/UserContext.jsx'
import {ProductCrudProvider} from "../features/product/contexts/ProductCrudContex.jsx";
import {ProductProvider} from "../features/product/contexts/ProductContext.jsx";
import {CrudProvider} from "../CrudContext.jsx";

// Este es tu Wrapper "CRUD"
export const CRUDWrapper = ({ children }) => {
  return (
  <UIProvider>
    <CrudProvider>
      <ListingProvider>
        {/*<ClientProvider>*/}
        <ProductProvider>
          <ProductCrudProvider>
            <CarritoProvider>
              <ListingCrudProvider>
                <UserProvider>
                  {children}
                </UserProvider>
              </ListingCrudProvider>
            </CarritoProvider>
          </ProductCrudProvider>
        </ProductProvider>
        {/*</ClientProvider>*/}
      </ListingProvider>
    </CrudProvider>
  </UIProvider>
  );
};
