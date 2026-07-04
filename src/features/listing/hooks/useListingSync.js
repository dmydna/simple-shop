import { useUrlParams } from "@hooks/useUrlParams";
import { useEffect } from "react";

/**
 * Agrega busqueda, paginacion y 
 * filtrado basico por searchParams
 */
export const useListingSync = ({ 
    setFilters, 
    setCurrentPage, 
    totalElements 
    }) => {

    const {tagsParam, categoryParam, pageParam, searchParam, filterParam, allParams} = useUrlParams();

    useEffect(() => {
        console.log("filterParam", filterParam)
        if (filterParam){
            if (tagsParam)         { setFilters( prev => ({ ...prev, tags: tagsParam }) ) }
            if (categoryParam)     { setFilters( prev => ({ ...prev, category: categoryParam }) ) }            
        }
       //if (!searchParam)      { setFilters({}) }
        if (!pageParam)        { setCurrentPage(1) }
        if (!isNaN(pageParam)) { setCurrentPage(Number(pageParam)) }
        if (searchParam)       { setFilters({ title: searchParam }) }

        if(!allParams){setFilters({})}

    }, [tagsParam, pageParam, categoryParam, filterParam, allParams,
        searchParam, setFilters, setCurrentPage, totalElements])


    return {tagsParam, pageParam, categoryParam, searchParam}
}