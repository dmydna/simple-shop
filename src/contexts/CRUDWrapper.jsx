import { BrowserRouter } from "react-router-dom";
import { ListingProvider } from "../features/listing/hooks/ListingContext.jsx";
import { ProductProvider } from "../features/product/hooks/ProductContext.jsx";
import { ClientProvider } from "../features/client/ClientContext.jsx";
import { CarritoProvider } from "../features/cart/contexts/CartContext.jsx";
import { UIProvider } from "./UIContext";
import { ListingFormProvider } from "../features/listing/hooks/ListingFormContext.jsx";
import { UserProvider } from '../features/profile/hooks/UserContext.jsx'
import {ProductFormProvider} from "../features/product/hooks/ProductFormContext.jsx";


// Este es tu Wrapper "CRUD"
export const CRUDWrapper = ({ children }) => {
  return (
  <UIProvider>
    <ListingProvider> 
        {/*<ClientProvider>*/}
        {/*  <ProductProvider>*/}
        {/*    <ProductFormProvider>*/}
              <CarritoProvider>
                <ListingFormProvider>
                  <UserProvider>
                    {children}
                  </UserProvider>
                </ListingFormProvider>
              </CarritoProvider>
        {/*    </ProductFormProvider>*/}
        {/*  </ProductProvider>*/}
        {/*</ClientProvider>*/}
    </ListingProvider>
  </UIProvider>
  );
};
