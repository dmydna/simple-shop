import { set } from "nprogress";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";



// Paginacion
export const ProductContext = createContext(null)

export function PagacionProvider({ children }) {

    // Paginador
    const [items, setItems] = useState([]); // Todos los datos
    const [currentPage,  setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage ] = useState(10); // Ejemplo: 10 por página
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const lastItemIndex = currentPage * itemsPerPage; 
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = items.slice(firstItemIndex, lastItemIndex)
    

    return (
        <PaginacionContext.Provider 
         value={{ 
            items, 
            setItems,
            currentPage, 
            setCurrentPage,
            currentItems, 
            totalItems,
            totalPages,
            setService,
         }} />
    )

}

export const usePaginacion = () => useContext(PaginacionContext);