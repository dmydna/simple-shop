import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Agrega busqueda, paginacion y filtrado basico por searchParams:
 * - category, tags, search, page
 */
export const useServiceParams = ({ baseHook }) => {

    const {setFilters, setCurrentPage, currentPage, totalElements, ...props} = baseHook;
    const [searchParams, setSearchParams] = useSearchParams();
    const tagsParam = searchParams.get('tags');
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search')
    const categoryParam = searchParams.get('category')

    useEffect(() => {
        if (!searchParam)      { setFilters({}) }
        if (!pageParam)        { setCurrentPage(1) }
        if (!isNaN(pageParam)) { setCurrentPage(Number(pageParam)) }
        if (tagsParam)         { setFilters({ tags: tagsParam }) }
        if (categoryParam)     { setFilters({ category: categoryParam }) }
        if (searchParam)       { setFilters({ title: searchParam }) }

    }, [tagsParam, pageParam, categoryParam,
        searchParam, setFilters, setCurrentPage, totalElements])


    return {tagsParam, pageParam, categoryParam, searchParam}
}