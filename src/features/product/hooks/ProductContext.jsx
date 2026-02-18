import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { productService } from '../service/productService.js';
import { useUIContext } from "../../../contexts/UIContext.jsx";



export const ProductContext = createContext(null)

export function ProductProvider({ children }){

    const [ loading, setLoading ] = useState(true);
    const [ currentProduct, setCurrentProduct ] = useState(null)

    // Filtros
    const [ filters, setFilters ] = useState({tags : [], minPrice: 0, maxPrice : 15000})
    const [ resetFilter, setResetFilter ] = useState(false)
    const [ filterDraft, setFilterDraft ] = useState({tags:[], minPrice:0, maxPrice:15000})
    // NUEVOS
    const [products, setProducts]= useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);



    const pageFix = (page) => {
       if(isNaN(page)){return 1}
       if(page-1 < 0) {return 1}
    }


    const fetchData = async (page, currentFilters) => {
        nprogress.start();
        setLoading(true);
        setError(null)
        try {
          // Enviamos TODO al backend
          const data = await productService.getPage({
            page: pageFix(page)-1,
            size: 8,
            ...currentFilters
          });
          setProducts(data.content);
          setTotalProducts(data.totalElements);
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

    const getCurrentProduct = async (hash) => {
      try {
         nprogress.start();
         const data = await productService.getByHash(hash);
         setCurrentProduct(data.product ? data.product : data);

      } catch (err) {
         console.error("Error de carga de API", err);
      } finally {
          setLoading(false);
          nprogress.done();
      }
    }


    useEffect(() => {
      fetchData(currentPage, filters);
    },[currentPage, JSON.stringify(filters)]);


    return (
        
        <ProductContext.Provider 
        value={{ 
          currentProduct, setCurrentProduct,
          products, setProducts, 
          loading, setLoading,
          currentPage, setCurrentPage,
          resetFilter, setResetFilter,
          filterDraft, setFilterDraft, 
          filters, setFilters,
          getCurrentProduct,
          fetchData,
          totalPages,
          totalProducts, 
          error
        }}>
            {children}
        </ProductContext.Provider>

    )
}

export const useProducts = () => useContext(ProductContext);

