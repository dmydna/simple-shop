import nprogress from "nprogress";
import { useCallback, useEffect, useState } from "react";
import { usePageable } from "../features/pagination/hook/usePageable.js";
import { useFetch } from "./useFetch.js";

export const useFetchData = ({service, size, methodName = 'getPage'}) => {

    const [filters, setFilters] = useState({})

    const {loading, setLoading, error, setError, content, setContent, 
      success, setSuccess} = useFetch()
    const {currentPage,setCurrentPage, setTotalElements, setTotalPages,
        totalPages,totalElements} = usePageable()

    const fetchData = async (page, currentFilters) => {
        nprogress.start();
        setLoading(true);
        setError(null)
        try {
            // Enviamos TODO al backend
            const data = await service?.[methodName]({
                page: page-1,
                size: size || 8,
                ...currentFilters
            });
            setContent(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages)
            setSuccess(true)
            //console.log(data)
        } catch (err) {
            console.error("Error de carga de API", err);
            setError(err)
        } finally {
            setLoading(false);
            setSuccess(false)
            nprogress.done();
        }
    };


    const refreshData = useCallback(() => {
          fetchData(currentPage, {})
    },[currentPage, filters])

    useEffect(() => {
        fetchData(currentPage, filters);
    },[currentPage, JSON.stringify(filters)]);


    return ({
        refreshData,
        loading,
        setLoading,
        error,
        setError,
        content,
        setContent,
        currentPage,
        setCurrentPage,
        setTotalElements,
        setTotalPages,
        totalPages,
        totalElements,
        fetchData,
        filters,
        setFilters,
        success, setSuccess
    })
}
