import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useNavParams = ({ baseHook }) => {

    const {setFilters, setCurrentPage, currentPage, totalElements, setId} = baseHook;

    const [searchParams, setSearchParams] = useSearchParams();
    const tagsParam = searchParams.get('tags');
    const hashParam = searchParams.get('hash'); 
    const pageParam = searchParams.get('page');
    const idParam = searchParams.get('id');
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');

    useEffect(() => {
        console.log("searchparams",searchParams)
        if (!searchParam)  { setFilters({}) }
        if (pageParam)      { setCurrentPage(Number(pageParam))}
        if (!pageParam)    { setCurrentPage(1) }
        if (isNaN(Number(pageParam))) { setCurrentPage(1) }
        if (tagsParam)     { setFilters({ tags: tagsParam }) }
        if (categoryParam) { setFilters({ categories: categoryParam }) }
        if (searchParam)   { setFilters({ title: searchParam }) }
        if (hashParam)     { setId( hashParam ) }
    }, [tagsParam, pageParam, categoryParam,
        searchParam, setFilters, setCurrentPage, totalElements])


    return {
        searchParams, 
        setSearchParams,
        hashParam,
        idParam
    }
}