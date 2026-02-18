import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {listingService} from "../services/listingService.js";
import {useSearchParams} from "react-router-dom";
import {useFilter} from "../../filters/hooks/useFilter.jsx";
import {usePageable} from "../contexts/usePageable.js";
import {usePageFilter} from "../contexts/usePageFilter.js";
import {useFetch} from "../../search/useFetch.jsx";

export const ListingContext = createContext(null)

export function ListingProvider({ children }){


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
        try {
            // Enviamos TODO al backend
            const data = await listingService.getPage({
                page: page-1,
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


    return (

        <ListingContext.Provider
            value={{
                fetchDataByHash ,
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
            }}>
            {children}
        </ListingContext.Provider>

    )
}

export const useListings = () => useContext(ListingContext);