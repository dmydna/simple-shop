import {useContext, useEffect, useState} from "react";
import nprogress from "nprogress";
import {listingService} from "../services/listingService.js";
import {useFiltersCallback} from "../../filters/hooks/useFiltersCallback.jsx";
import {usePageable} from "../../pagination/hook/usePageable.js";
import {useFilter} from "../../filters/hooks/useFilter.jsx";
import {useFetch} from "../../../contexts/useFetch.jsx";

export const useListing = (initialSize = 8) => {

    const [products, setProducts] = useState([]);
    const [listingHash, setListingHash] = useState(null);

    const [currentListing, setCurrentListing] = useState({})
    const {loading, setLoading, error, setError, content, setContent} = useFetch()
    const {currentPage,setCurrentPage,setTotalElements,
        setTotalPages, totalPages,totalElements} = usePageable()
    const [ filters, setFilters ] = useState({})


    const fetchData = async (page, currentFilters) => {
        nprogress.start();
        setLoading(true);
        setError(null)
        console.log('FetchData current page', currentPage)
        try {
            // Enviamos TODO al backend
            const data = await listingService.getPage({
                page:  isNaN(page) || page-1 === -1 ?  0 : page-1,
                size: 8,
                ...currentFilters
            });
            setContent(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages)
            console.log("LISTING FETCH: Ok!")
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


    const fetchDataByHash = async (hash) => {
        try {
            const data = await listingService.getByHash(hash);
            setCurrentListing(data.listing);
        } catch (err) {
            console.error("Error de carga de API", err);
            throw err
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(listingHash){
            fetchDataByHash(listingHash)
        }
    }, [listingHash]);


    return ({
        fetchDataByHash ,
        content,
        setContent,
        listings: content,
        setListings: setContent,
        setCurrentPage,
        currentPage,
        totalElements,
        loading,
        fetchData,
        setFilters,
        currentListing,
        error,
        totalPages,
        filters,
        products, setProducts,
        listingHash,
        setListingHash
    })
}