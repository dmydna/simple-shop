import {useEffect, useState} from "react";
import nprogress from "nprogress";

import {productService} from "../service/productService.js";
import {usePageable} from "../../pagination/hook/usePageable.js";
import {useFetch} from "../../../contexts/useFetch.jsx";



export const useProduct = (initialSize = 8) => {

    const [productId, setProductId] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({})
    const {loading, setLoading, error,
        setError, content, setContent} = useFetch()
    const {currentPage,setCurrentPage, setTotalElements,
        setTotalPages, totalPages,totalElements} = usePageable()
    const [ filters, setFilters ] = useState({})

    const fetchData = async (page, currentFilters) => {
        nprogress.start();
        setLoading(true);
        setError(null)
        console.log("Aca >>", currentFilters)
        try {
            // Enviamos TODO al backend
            const data = await productService.getPage({
                page: page-1,
                size: 8,
                ...currentFilters
            });
            setContent(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages)
            console.log("LISTING FETCH: Ok!")
            console.log(content)
        } catch (err) {
            console.error("Error de carga de API", err);
            setError("No pudimos cargar los productos. Revisa tu conexión.")
        } finally {
            setLoading(false);
            nprogress.done();
        }
    };
    // crear un estado predicateFilter que


    useEffect(() => {
        fetchData(currentPage, filters);
    },[currentPage, JSON.stringify(filters)]);



    return ({
        fetchData,
        content,
        products: content,
        setProducts: setContent,
        setCurrentPage,
        currentPage,
        totalElements,
        loading,
        setFilters,
        currentProduct,
        setCurrentProduct,
        error,
        totalPages,
        filters,
        productId,
        setProductId
    })
}