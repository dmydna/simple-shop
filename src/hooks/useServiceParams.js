import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useServiceParams = ({ useHook, onMeta }) => {


    const {setFilters, setCurrentPage, currentPage, totalElements} = useHook()

    const [searchParams, setSearchParams] = useSearchParams();
    const tagsParam = searchParams.get('tags');
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search')
    const categoryParam = searchParams.get('category')

    useEffect(() => {
        if (!searchParam) {
            onMeta({ title: "Productos" });
            setFilters({});
        }
        if (!pageParam) { setCurrentPage(1) }
        if (!isNaN(pageParam)) { setCurrentPage(Number(pageParam)); }
        if (tagsParam) { setFilters({ tags: tagsParam }); }
        if (categoryParam) {
            setFilters({ page: 0, categories: categoryParam });
            if (categoryParam.split(',').length == 1) {
                onMeta((prev) => ({ ...prev, title: categoryParam }));
            }
        }
        if (searchParam) {
            setFilters({ title: searchParam });
            onMeta((prev) => ({
                ...prev,
                title: "Resultados",
                message: `encontrados: ${totalElements}`
            }
            ));
        }


    }, [tagsParam, pageParam, categoryParam,
        searchParam, setFilters, setCurrentPage, totalElements])


    return {}
}