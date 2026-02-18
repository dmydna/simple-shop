import {useContext, useEffect, useState} from "react";
import nprogress from "nprogress";
import {listingService} from "../services/listingService.js";
import {useFiltersCallback} from "../../filters/hooks/useFiltersCallback.jsx";
import {usePageable} from "./usePageable.js";
import {useFilter} from "../../filters/hooks/useFilter.jsx";

export const useListingLogic = (initialSize = 8) => {

    const [ loading, setLoading ] = useState(true);
    const [ currentListing, setCurrentListing ] = useState(null)

    // Filtros
    const { filters, setFilters, resetFilter, filterDraft, setFilterDraft, setResetFilter } = useFilter()
    const { totalPages, setTotalPages, currentPage, setCurrentPage, totalItems,setTotalItems} = usePageable()

    const [listings, setListings]= useState([])
    const [error, setError] = useState(null);

    const pageFix = (page) => {
        if(isNaN(page)){return 1}
        if(page-1 < 0) {return 1}
        return page;
    }


    const fetchData = async (page, currentFilters) => {
        nprogress.start();
        setLoading(true);
        setError(null)
        try {
            const data = await listingService.getPage({
                page: pageFix(page)-1,
                size: 8,
                ...currentFilters
            });
            setListings(data.content);
            setTotalItems(data.totalElements);
            setTotalPages(data.totalPages)
            console.log("LISTING FETCH_DATA: Ok!")
        } catch (err) {
            console.error("Error de carga de API", err);
            setError("No pudimos cargar los productos. Revisa tu conexión.")
        } finally {
            setLoading(false);
            nprogress.done();
        }
    };
    // crear un estado predicateFilter que

    const getCurrentListing = async (hash) => {
        nprogress.start();
        setLoading(true);
        try {
            const data = await listingService.getByHash(hash);
            setCurrentListing(data.listing ? data.listing : data);
            console.log("LISTING fetch_Current: Ok!")
        } catch (err) {
            console.error("Error de carga de API", err);
            setError("No pudimos cargar el producto. Revisa tu conexión.")
        } finally {
            setLoading(false);
            nprogress.done();
        }
    }


    useEffect(() => {
        fetchData(currentPage, filters);
    },[currentPage, JSON.stringify(filters)]);


    return ({
        currentListing, setCurrentListing,
        listings, setListings,
        loading, setLoading,
        currentPage, setCurrentPage,
        resetFilter, setResetFilter,
        filterDraft, setFilterDraft,
        filters, setFilters,
        getCurrentListing,
        fetchData,
        totalPages,
        totalItems,
        error
    })
}