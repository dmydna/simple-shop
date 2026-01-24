import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useUIContext } from "../../contexts/UIContext";
import DropdownCheck from "../common/DropdownCheck";
import DropdownRange from "../common/DropdownRange";
import { useListings } from "../../contexts/ListingContext";

function FilterSearch({className, children, order="", size="lg"}){

    const { showFilter } =  useUIContext();
    const { setFilters, listings, setFilterDraft, filterDraft  } = useListings();

    const [searchParams, setSearchParams] = useSearchParams();
 
    const tagsParam = searchParams.get('tags');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');




    useEffect(()=>{
      const selectedTags = tagsParam ? tagsParam.split(',') : [];
      const minPrice = minPriceParam ? Number(minPriceParam) : 0
      const maxPrice = maxPriceParam ? Number(maxPriceParam) : 15000
      if(filterDraft.minPrice != undefined && filterDraft.maxPrice != undefined){
        setFilterDraft( prev => ({
          ...prev, 
          minPrice: minPrice,
          maxPrice: maxPrice,
        }))
      }
      
      if(filterDraft.tags != undefined){
        setFilterDraft( prev => ({
          ...prev, 
          tags: selectedTags,
        }))
      }
      setFilters( (prev) => ({...prev, ...filterDraft})) 
    },[listings, tagsParam, maxPriceParam, minPriceParam])
      

    const handleApplyFilters = () => {
      const newSearchParams = {};
        
      if (filterDraft?.tags != undefined && 
          filterDraft?.tags.length > 0
      ) {
        newSearchParams.tags = filterDraft.tags.join(',');
      }
      if(filterDraft.minPrice != undefined  && filterDraft.maxPrice != undefined ){
        newSearchParams.minPrice =filterDraft.minPrice;
        newSearchParams.maxPrice = filterDraft.maxPrice;
      }

      // Esto actualiza la URL a /filter?tags=oferta,nuevo&minPrice=50&maxPrice=300
      setSearchParams(newSearchParams)
      // aplica filtros
      setFilters( filterDraft )
    }

    const handleSubmit = () => {
      if (Object.keys(filterDraft).length > 0) {
        handleApplyFilters();
      }    
    }

    const handleReset = () => {
      setSearchParams("")
      setFilters({})
    }

    const setTags = [...new Set(listings.flatMap(p => p.tags))];

    return(

    <Form 
     onSubmit={handleSubmit}
     style={{top:"70px"}} 
     className={`mb-5 bg-white ${className} ${!showFilter ? 'd-none' : ''} `}>
      <Form.Group as={Row}>
        <Col xs={12} sm={6} md={4} lg={size == 'sm'  ? 6 : 3} className={order}>
          <DropdownCheck 
              setFilterDraft={ setFilterDraft }
              variant="light"
              className="border rounded my-2" 
              array={setTags}>
            <span className="fw-semibold">etiquetas</span>
          </DropdownCheck>
        </Col>
        <Col xs={12} sm={6} md={4} lg={size == 'sm' ? 6 : 3}>
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
              <i className="bi bi-funnel"></i>
              <span className="ms-2">filtrar</span>
          </Button>
          <Button 
            onClick={handleReset}
            style={{maxWidth: "200px"}} className="w-100 my-2"
            variant="secondary"
          >
            <i className="bi bi-trash3-fill"></i>
            <span className="ms-2">limpiar</span>
          </Button>
          </div>
        </Col>
      </Form.Group>
    </Form>


    )
}

export default FilterSearch;