import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useMatch, useSearchParams } from "react-router-dom";
import AddToCartButton from "../components/cart/AddToCartButton";
import CategoryNav from "../components/common/CategoryNav";
import Pagination from "../components/pagination/Pagination";
import CardProduct from "../components/product/CardProduct";
import FilterSearch from "../components/search/FilterSearch";
import { useListings } from "../contexts/ListingContext";
import { useUIContext } from "../contexts/UIContext";
import { usePaginacion } from "../contexts/PaginationContext";
import { category, tags } from "../utils/posts";



function Products() {
  
  const { listings, currentPage, setCurrentPage, totalPages, setFilters } = useListings()
  const [searchParams, setSearchParams] = useSearchParams();

  const tagsParam = searchParams.get('tags');
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search')
  const categoryParam = searchParams.get('category')

  useEffect(()=>{
    if(!isNaN(pageParam)) setCurrentPage(pageParam);
    if(tagsParam) setFilters({page: 0, tags: tagsParam})
    if(categoryParam) setFilters({page:0, categories: categoryParam});
    if(searchParam) setFilters({page: 0, title: searchParam})
  }, [tagsParam, pageParam, categoryParam, searchParam])


  useEffect(()=>{
    console.log(searchParam)
  }, [searchParam])

  const [meta, setMeta] = useState({
    title: "Productos",
    message: "",
    description: "",
  });

  const { showFilter } =  useUIContext()
  
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
        showFilter ?
        <>
          <CategoryNav show={showFilter} />
          <FilterSearch 
              items={listings} 
          className=""/>
        </> : ''
       }



      <Row>
        {listings.map((p) => (  
          <CardProduct className={'border m-2'}
            key={p.id}
            id={p.id}
            hash={p.hash}
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
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages} 
    />
    </>
  )
}

export default Products;
