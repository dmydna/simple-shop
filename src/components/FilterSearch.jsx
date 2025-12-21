import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useUIContext } from "../contexts/UIContext";
import DropdownCheck from "./DropdownCheck";
import DropdownRange from "./DropdownRange";

function FilterSearch({className, children, order=""}){


    const {showFilter} =  useUIContext()
    const {products,  filterDraft, setFilterDraft, setActiveFilters, setVisibleProducts, resetFilter, setResetFilter} = useProducts()

    const [searchParams, setSearchParams] = useSearchParams();
 
    const tagsParam = searchParams.get('tags');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');


    useEffect(()=>{
      const selectedTags = tagsParam ? tagsParam.split(',') : [];
      const minPrice = minPriceParam ? Number(minPriceParam) : 0
      const maxPrice = maxPriceParam ? Number(maxPriceParam) : 15000
      setFilterDraft( prev => ({
        ...prev, 
        tags:     selectedTags,
        minPrice: minPrice,
        maxPrice: maxPrice,
      }))
      setActiveFilters( filterDraft ) 
    },[products, tagsParam, maxPriceParam, minPriceParam])
      

    const handleReset = () => {
      setSearchParams("")
      setActiveFilters({})
      setResetFilter(true)
    }

    const handleApplyFilters = () => {
      const newSearchParams = {};
        
      if (filterDraft?.tags?.length > 0) {
        newSearchParams.tags = filterDraft.tags.join(',');
      }
      newSearchParams.minPrice =filterDraft.minPrice;
      newSearchParams.maxPrice = filterDraft.maxPrice;
      // Esto actualiza la URL a /filter?tags=oferta,nuevo&minPrice=50&maxPrice=300
      setSearchParams(newSearchParams)
      // aplica filtros
      setActiveFilters( filterDraft )
    }

    const handleSubmit = () => {
      if(filterDraft != {}){
        handleApplyFilters()
      }      
    }



    const setTags = [...new Set(products.flatMap(p => p.tags))];

    return(

    <Form 
     onSubmit={handleSubmit}
     style={{top:"70px"}} 
     className={`mb-5 bg-white ${className} ${!showFilter ? 'd-none' : ''} `}>
      <Form.Group as={Row}>
        <Col xs={12} sm={6} md={4} lg={3} className={order}>
          <DropdownCheck 
              variant="light"
              className="border rounded my-2" 
              array={setTags}>
            <span className="fw-semibold">etiquetas</span>
          </DropdownCheck>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
           {children ? children :
           <DropdownRange 
             className="border rounded my-2"
             variant="light" 
             min={0} 
             max={1500} 
             defaultValue={20} 
             type={'$'}>
             <span className="fw-medium">precio</span>
           </DropdownRange>
          }
        </Col>
        <Col sm={6} md={4} lg={6} className="order-2">
          <div className="w-100 d-flex justify-content-start justify-content-md-end gap-2">
          <Button 
            onClick={handleSubmit}
            style={{maxWidth: "200px"}} className="w-100 my-2"
          >
            filtrar
          </Button>
          <Button 
            onClick={handleReset}
            style={{maxWidth: "200px"}} className="w-100 my-2"
            variant="secondary"
          >
            <i class="bi bi-trash3-fill"></i>
            <span className="ms-2">limpiar</span>
          </Button>
          </div>
        </Col>
      </Form.Group>
    </Form>


    )
}

export default FilterSearch;