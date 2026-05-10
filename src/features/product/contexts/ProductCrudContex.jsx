import { createContext, useCallback, useContext, useEffect } from "react";
import { useProductCrud } from "../hooks/useProductCrud.js";

export const ProductCrudContext = createContext(null)

export function ProductCrudProvider({ children }){
    
    const hook = useProductCrud()

    return (

        <ProductCrudContext.Provider value={hook}>
            {children}
        </ProductCrudContext.Provider>

    )
}

export const useProductCrudContext = () => useContext(ProductCrudContext);

