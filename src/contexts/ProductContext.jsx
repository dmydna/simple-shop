import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { productService } from '../services/productService.js';
import { useUIContext } from "./UIContext.jsx";

export const ProductContext = createContext(null)

export function ProductProvider({ children }){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setCurrentPage } = useUIContext();
    const [visibleProducts, setVisibleProducts] = useState([])


    // Filtros
    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [filterDraft, setFilterDraft] = useState({tags : []})
    const [activeFilters, setActiveFilters] = useState({tags : []})
    const [resetFilter, setResetFilter] = useState(false)


    // crear un estado predicateFilter que

    const fetchData = async () => {
      try {
          const data = await productService.getAll();
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
        // 1. Tags: Si no hay tags activos, pasa el filtro. 
        // Si hay, el producto debe tener al menos uno de ellos.
        const { tags } = activeFilters;
        const matchTags = !tags || tags.length === 0 || 
                          tags.some(t => p.tags?.includes(t));
    
        // 2. Busqueda y Categoría
        const matchCategory = category ? p.category === category : true;
        const matchSearch = search ? 
             p.name?.toLowerCase().includes(search.toLowerCase()) : true;
    
        return matchCategory && matchSearch && matchTags;
      });
    }, [products, category, search, activeFilters]);

    return (
        
        <ProductContext.Provider 
        value={{ 
          products, setProducts, 
          loading, setLoading,
          setCategory,
          setSearch,
          filterDraft, setFilterDraft,
          activeFilters, setActiveFilters,
          filtered,
          visibleProducts, setVisibleProducts,
          resetFilter, setResetFilter,
          fetchData,
          }}>
            {children}
        </ProductContext.Provider>

    )
}

// export const useProducts = () => {
//   const context = useContext(ProductContext);
//   return context; 
// };

export const useProducts = () => useContext(ProductContext);
