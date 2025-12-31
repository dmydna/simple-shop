import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useMatch } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import CardProduct from "../components/CardProduct";
import CategoryNav from "../components/CategoryNav";
import FilterSearch from "../components/FilterSearch";
import { useProducts } from "../contexts/ProductContext";
import { useUIContext } from "../contexts/UIContext";
import Pagination from "../components/Pagination";




function Products() {

  // Agregar al Carrito, actualiza stock e incrementa producto en el Carrito

  const {currentItems, setVisibleClients, setItems, setItemsPerPage, currentPage, setCurrentPage, totalPages} = useUIContext();

  const categoryMatch = useMatch("/productos/category/:category");
  const searchMatch = useMatch("/productos/search/:product");
  const filterMatch = useMatch("/productos/filter/:product");

  const { setCategory, setSearch, filtered, setActiveFilters, setResetFilter,loading, products } = useProducts();
  const location = useLocation();

  // resetea valores al entrar.
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFilters({});
    setResetFilter(true)
  }, []);



  // Informacion a mostrar segun Pagina
  const [meta, setMeta] = useState({
    title: "Productos",
    message: "",
    description: "",
  });
  

  const [ showCategoryNav, setShowCategoryNav ] = useState(false);


  
  useEffect(() => {
     if( location.pathname.startsWith("/productos/category") || 
       location.pathname.startsWith("/productos/search")   || 
       location.pathname === "/productos" ){
      // resetea filtro activos
      setActiveFilters({tags : [], minPrice: 0, maxPrice : 15000})
     }
     if(location.pathname.startsWith("/productos/filter")){
      // resetea otro filtros 
      setSearch("")
      setCategory(null)
     }
  },[location])

  useEffect(() => {
    let routeType = 'base';

    if (categoryMatch?.params.category) {
        routeType = 'category';
    } else if (searchMatch?.params.product) {
        routeType = 'search';
    } else if (location.pathname.startsWith("/productos/filter")) {
        routeType = 'filter';
    }
    
    switch (routeType) {
        case 'category':
            setCategory(categoryMatch.params.category);
            setSearch(""); // Limpieza de búsqueda
            setMeta(prev => ({
                ...prev,
                title: categoryMatch.params.category,
                message: filtered.length + " productos"
            }));
            break;

        case 'search':
            setCategory(null); // Limpieza de categoría
            setSearch(searchMatch?.params.product)
            setMeta(prev => ({
                ...prev,
                title: "Resultados",
                message: filtered.length + " encontrado"
            }));
            break;

        case 'filter':
            // Si el filtro es solo por query params sin búsqueda de texto libre
            setMeta(prev => ({
                ...prev,
                title: "Resultados",
                message: filtered.length + " encontrados"
            }));
            break;

        case 'base':
        default:
            setCategory(null);
            setSearch("");
            setMeta(prev => ({
                ...prev,
                title: "Productos",
                message: "todas las categorias"
            }));
            break;
    }

  }, [location.pathname, categoryMatch, searchMatch, filtered]);



    // Lógica de paginación
    useEffect(()=>{
      setItemsPerPage(8)
      setItems(filtered)
      console.log(filtered)
    },[filtered, products])


  return (
    <>
    <Container fluid="xl" className="bg-white rounded mt-2 mb-5 pb-5">

       <div className="w-100 d-flex flex-wrap mt-2 mb-4">
         <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
          {meta.title}
         </span>
         <span style={{lineHeight: '2.3rem'}} className="text-secondary">
          {meta.message}
         </span>
       </div>
       {
        location.pathname.startsWith('/productos/filter') ?
        <>
          <CategoryNav show={showCategoryNav} />
          <FilterSearch className=""/>
        </> : ''
       }



      <Row>
        {currentItems.map((p) => (  
          <CardProduct className={'border m-2'}
            id={p.id}
            image={p.thumbnail}
            title={p.title}
            stock={p.stock}
            price={p.price}
            discount={p.discountPercentage}
          >
          <AddToCartButton variant="outline-success" id={p.id} />
          </CardProduct>
        ))}
      </Row>
    </Container>
    <Pagination 
           className={`container-xl`}
           currentPage={currentPage} 
           setCurrentPage={setCurrentPage} totalPages={totalPages} 
      />
    </>
  )
}

export default Products;
