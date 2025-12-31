import { BrowserRouter } from "react-router-dom";
import { ListingProvider } from "./ListingContext";
import { ProductProvider } from "./ProductContext";
import { ClientProvider } from "./ClientContext";
import { CarritoProvider } from "./CartContext";
import { UIProvider } from "./UIContext";

// Este es tu Wrapper "CRUD"
export const CRUDWrapper = ({ children }) => {
  return (
  <UIProvider>
    <ListingProvider> 
        <ClientProvider>
          <ProductProvider>
            <CarritoProvider>
              {children}
            </CarritoProvider>
          </ProductProvider>
        </ClientProvider>
    </ListingProvider>
  </UIProvider>
  );
};
