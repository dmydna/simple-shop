import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listingService } from '../services/listingService.js';
import { useUIContext } from "./UIContext.jsx";
export const ListingContext = createContext(null)

export function ListingProvider({ children }){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setItems, setItemsPerPage, currentItems, setCurrentPage } = useUIContext();
    const [visibleProducts, setVisibleProducts] = useState([])


    // Filtros
    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [filterDraft, setFilterDraft] = useState({tags : [], minPrice: 0, maxPrice : 15000})
    const [activeFilters, setActiveFilters] = useState({tags : [], minPrice: 0, maxPrice : 15000})
    const [resetFilter, setResetFilter] = useState(false)


    // crear un estado predicateFilter que

    const fetchData = async () => {
      try {
          const data = await listingService.getAll();
          setProducts(data.products ? data.products : data);
      } catch (err) {
         console.error("Error de carga de API", err);
      } finally {
          setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchData() ;
    }, []);


    useEffect( ()=>{
      // Reseteo Pagination cuando entro en pagina categorias o busqueda
      setCurrentPage(1)
    }, [category, search])


    // Logica de filter
    const filtered = useMemo(() => {
      return products.filter(p => {

        if(resetFilter){
          setResetFilter(false)
          return products;
        }
        const { tags, minPrice, maxPrice } = activeFilters;
        
        const matchTags = ( !tags ? false: 
          tags.length === 0 || tags?.some(t => p.tags.includes(t))
        );
        const matchPrice = p.price >= minPrice && p.price <= maxPrice;
        
        const matchCategory = category ? p.category === category : true;
        
        const matchSearch = search ? 
         p.title.toLowerCase().includes(search.toLowerCase()) ||
         p.description?.toLowerCase().includes(search.toLowerCase()) ||
         p.brand?.toLowerCase().includes(search.toLowerCase())  : true;
        return matchCategory 
          && matchSearch 
          && (matchTags && matchPrice);
      });
    }, [products, category, search, activeFilters]);

    return (
        
        <ListingContext.Provider 
        value={{ 
          products, setProducts, 
          loading, setLoading,
          setCategory,
          setSearch,
          filterDraft, setFilterDraft,
          activeFilters, setActiveFilters,
          fetchData,
          filtered,
          visibleProducts, setVisibleProducts,
          resetFilter, setResetFilter
          }}>
            {children}
        </ListingContext.Provider>

    )
}

export const useListings = () => useContext(ListingContext);

