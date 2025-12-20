import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { productService } from '../services/productService';
export const ProductContext = createContext(null)

export function ProductosProvider({ children }){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);


    // Filtros
    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [filterDraft, setFilterDraft] = useState({tags : [], minPrice: 0, maxPrice : 15000})
    const [activeFilters, setActiveFilters] = useState({tags : [], minPrice: 0, maxPrice : 15000})


    // crear un estado predicateFilter que

    const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
    const productosPorPagina = 8;


    useEffect(() => {
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
      fetchData() ;
    }, []);

    useEffect( ()=>{
      // Reseteo Pagination cuando entro en pagina categorias o busqueda
      setPaginaActual(1)
    }, [category, search])


    // Logica de filter
    const filtered = useMemo(() => {
      return products.filter(p => {

        const { tags, minPrice, maxPrice } = activeFilters;
        const matchTags = tags.length === 0 || tags.some(t => p.tags.includes(t));
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


    // Lógica de paginación
    const indiceUltimoProducto = paginaActual * productosPorPagina; 
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosVisibles = filtered.slice(indicePrimerProducto, indiceUltimoProducto);
    const totalPaginas = Math.ceil(filtered.length / productosPorPagina);


    return (
        
        <ProductContext.Provider 
        value={{ 
          products, setProducts, 
          loading, setLoading, 
          totalPaginas, paginaActual, setPaginaActual, 
          productosVisibles ,filtered,
          setCategory,
          setSearch,
          filterDraft, setFilterDraft,
          activeFilters, setActiveFilters
          }}>
            {children}
        </ProductContext.Provider>

    )
}

export const useProducts = () => useContext(ProductContext);