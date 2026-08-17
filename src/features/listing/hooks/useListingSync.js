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

    const {tagsParam, minPrice, maxPrice ,pageParam, searchParam, filterParam, categoryParam, allParams} 
    = useUrlParams();

    useEffect(() => {

        if (filterParam){
            if (tagsParam)         { setFilters( prev => ({ ...prev, tags: tagsParam }) ) }            
            if (minPrice && minPrice){
                { setFilters( prev => ({ ...prev, minPrice, maxPrice }) ) }
            }
        }

        if (!pageParam)        { setCurrentPage(1) }
        if (!isNaN(pageParam)) { setCurrentPage(Number(pageParam)) }
        if (searchParam)       { setFilters({ title: searchParam }) }
        if (categoryParam)     { setFilters({category: categoryParam}) }

        if (!allParams){setFilters({})}

    }, [tagsParam, pageParam, categoryParam, filterParam, allParams,
        searchParam, setFilters, setCurrentPage, totalElements])


    return {tagsParam, pageParam, categoryParam, searchParam}
}