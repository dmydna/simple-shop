import { useState, useCallback, useEffect } from 'react';
import { listingService } from "../services/listingService.js";



export const useFetchListings = (initialSize = 8) => {

    const [ loading , setLoading] = useState(false)

    const [ filters, setFilters ] = useState({tags : [], minPrice: 0, maxPrice : 15000})
    const [ resetFilter, setResetFilter ] = useState(false)
    const [ filterDraft, setFilterDraft ] = useState({tags:[], minPrice:0, maxPrice:15000})
    // NUEVOS
    const [listings, setListings]= useState([])
    const [totalListings, setTotalListings] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useCallback(async (page, currentFilters) => {
        setLoading(true);
        try {
            const data = await listingService.getPage({
                page: page - 1,
                size: initialSize,
                ...currentFilters
            });
            setListings(data.content);
            setTotalListings(data.totalElements);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Error de carga de API", err);
        } finally {
            setLoading(false);
        }
    }, [initialSize]);


    useEffect(() => {
        fetchData(currentPage, filters);
    }, [JSON.stringify(filters)]);

    return { listings, totalItems: totalListings, totalPages, loading, fetchData, setFilters };
}