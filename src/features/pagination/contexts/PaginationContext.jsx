import React, {  useEffect,  useState } from "react";
import {usePageable} from "../hook/usePageable.js";


/** Paginacion Local **/
export function usePagination() {

    // usa pageable para NO repetir codigo.
    const { totalPages, setTotalPages, currentPage,
        setCurrentPage, pageSize, setPageSize, totalItems,
        setTotalItems} = usePageable();

    // Paginador
    const [items, setItems] = useState([]);
    const lastItemIndex = currentPage * pageSize;
    const firstItemIndex = lastItemIndex - pageSize;
    const currentItems = items.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        setTotalPages(Math.ceil(items.length / pageSize));
        setTotalItems(items.length)
    }, [items.length, pageSize]);


    return ({
            items, 
            setItems,
            currentPage,
            pageSize,
            setPageSize,
            setCurrentPage,
            currentItems, 
            totalItems,
            totalPages,
         })

}
