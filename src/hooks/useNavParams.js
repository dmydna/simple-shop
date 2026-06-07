import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";



// TODO: renombrar a useTableParams
// TODO: mover a @dashboard
export const useNavParams = ({ baseHook }) => {

    const {setFilters, setCurrentPage, totalElements, setId, ...props} = baseHook;

    const [searchParams, setSearchParams] = useSearchParams();

    const tableVersion = searchParams.get('tableVersion');
    const tagsParam = searchParams.get('tags');
    const hashParam = searchParams.get('hash'); 
    const pageParam = searchParams.get('page');
    const idParam = searchParams.get('id');
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    const statusParam = searchParams.get('status');
    const roleParam = searchParams.get('role');
    const skuParam = searchParams.get('sku');



    useEffect(() => {
        if (!searchParam)   { setFilters({}) }
        if (pageParam)      { setCurrentPage(Number(pageParam))}
        if (!pageParam)     { setCurrentPage(1) }
        if (isNaN(Number(pageParam))) { setCurrentPage(1) }
        if (tagsParam)      { setFilters({ tags: tagsParam }) }
        if (roleParam)      { setFilters({ role: roleParam }) }
        if (categoryParam)  { setFilters({ category: categoryParam }) }
        if (searchParam)    { setFilters({ title: searchParam }) }
        if (hashParam)      { setId( hashParam || idParam ) } else { setId( null ) }
        if (tableVersion)   { props?.refreshData() }
        if (statusParam)    { setFilters({ status: statusParam }) }


    }, [tagsParam, pageParam, categoryParam, tableVersion, statusParam,
        searchParam, setFilters, setCurrentPage, totalElements])


    return {
        searchParams, 
        setSearchParams,
        hashParam,
        idParam
    }
}
