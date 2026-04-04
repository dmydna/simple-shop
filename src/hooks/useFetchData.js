import nprogress from "nprogress";
import { useEffect, useState } from "react";
import { usePageable } from "../features/pagination/hook/usePageable.js";
import { useFetch } from "./useFetch.js";

export const useFetchData = ({service}) => {

    const [filters, setFilters] = useState({})

    const {loading, setLoading, error, setError, content, setContent} = useFetch()
    const {currentPage,setCurrentPage, setTotalElements, setTotalPages,
        totalPages,totalElements} = usePageable()

    const fetchData = async (page, currentFilters) => {
        nprogress.start();
        setLoading(true);
        setError(null)
        try {
            // Enviamos TODO al backend
            const data = await service?.getPage({
                page: page-1,
                size: 8,
                ...currentFilters
            });
            setContent(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages)
            console.log(data)
        } catch (err) {
            console.error("Error de carga de API", err);
            setError("No pudimos cargar los elemento. Revisa tu conexión.")
        } finally {
            setLoading(false);
            nprogress.done();
        }
    };

    useEffect(() => {
        fetchData(currentPage, filters);
    },[currentPage, JSON.stringify(filters)]);


    return ({
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
        setFilters
    })
}