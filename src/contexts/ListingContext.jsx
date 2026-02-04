import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listingService } from '../services/listingService.js';
import { useUIContext } from "./UIContext.jsx";
export const ListingContext = createContext(null)

export function ListingProvider({ children }){

    const [ loading, setLoading ] = useState(true);
    const [ currentListing, setCurrentListing ] = useState(null)

    // Filtros
    // const [ category, setCategory ] = useState(null);
    // const [ search, setSearch ] = useState("");
    const [ filters, setFilters ] = useState({tags : [], minPrice: 0, maxPrice : 15000})
    const [ resetFilter, setResetFilter ] = useState(false)
    const [ filterDraft, setFilterDraft ] = useState({tags:[], minPrice:0, maxPrice:15000})
    // NUEVOS
    const [listings, setListings]= useState([])
    const [totalListings, setTotalListings] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

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
          setListings(data.content);
          setTotalListings(data.totalElements);
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

    const getCurrentListing = async (hash) => {
      try {
        const data = await listingService.getByHash(hash);
        setCurrentListing(data.listing ? data.listing : data);

      } catch (err) {
         console.error("Error de carga de API", err);
      } finally {
          setLoading(false);
      }
    }


    useEffect(() => {
      fetchData(currentPage, filters);
    },[currentPage, JSON.stringify(filters)]);






    return (
        
        <ListingContext.Provider 
        value={{ 
          currentListing, setCurrentListing,
          listings, setListings, 
          loading, setLoading,
          // setCategory,
          // setSearch,
          fetchData,
          setCurrentPage,
          currentPage,
          resetFilter, 
          setResetFilter,
          getCurrentListing,
          setFilters,
          filterDraft, 
          setFilterDraft, 
          totalPages,
          totalListings, 
          error
        }}>
            {children}
        </ListingContext.Provider>

    )
}

export const useListings = () => useContext(ListingContext);

