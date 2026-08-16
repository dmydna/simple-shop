import React, { createContext, useContext } from "react";
import {useProduct} from "@f/product/hooks/useProduct.js";


export const ProductContext = createContext(null)

export function ProductProvider({ children }){

    const productHook = useProduct()

    return (
        
        <ProductContext.Provider value={productHook}>
            {children}
        </ProductContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

