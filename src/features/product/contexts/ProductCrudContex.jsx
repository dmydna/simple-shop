import { useProductForm } from "@/features/product/hooks/useProductForm.js";
import { createContext, useContext } from "react";

export const ProductCrudContext = createContext(null)

export function ProductCrudProvider({ children }){
    
    const hook = useProductForm()

    return (

        <ProductCrudContext.Provider value={hook}>
            {children}
        </ProductCrudContext.Provider>

    )
}

export const useProductCrudContext = () => useContext(ProductCrudContext);

