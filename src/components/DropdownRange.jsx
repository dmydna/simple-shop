import React, { useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { useListings } from "../contexts/ListingContext";



function DropdownRange({
    children, 
    min, 
    max, 
    defaultValue,
    type, 
    style, 
    className, 
    variant, 
    onFilterUpdate
}){



    const [maxPrice, setMaxPrice] = useState(max)
    const [minPrice, setMinPrice] = useState(min)


    const {setFilterDraft} =  useListings()

    useEffect(()=>{
        setFilterDraft( prev => ({
            ...prev, 
            minPrice: minPrice, 
            maxPrice: maxPrice
        }) );
    },[maxPrice, minPrice])

    const toggleText = `${type}${minPrice} - ${type}${maxPrice}`

    return(
    

        <Dropdown  style={style} className={`${className}`}>
        <Dropdown.Toggle 
            style={{opacity: '.6'}}
            variant={variant}
            className="d-flex align-items-center container-fluid text-start toggle-end" id="dropdown-basic">
            {children}  :
            <span className="small text-muted fw-semibold ms-3">
                 { maxPrice != max || minPrice != min ? `${toggleText}` : 'Seleccionar' }
            </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
           <Row  style={{minWidth: "320px"}} className="p-3 align-items-center">
              <Col className="mb-2" xs={12}>
                 <div className="d-flex align-items-center justify-content-between">
                     <div className="d-flex align-items-center p-0 m-0">
                     <small className="text-muted">Minimo: {type}</small>
                     <div style={{maxWidth: "60px"}} className="p-0 me-2">
                        <Form.Control style={{fontSize: ".875em"}} className="p-1"
                            type="number" 
                            min={min} 
                            max={max} 
                            defaultValue={min}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                     </div>
                     </div>
                     <small>Maximo: {type}{maxPrice} </small>
                 </div>
              </Col>
              <Col xw={12}>
                   <Form.Range className="w-100"
                      min={minPrice}
                      max={max}
                      defaultValue={defaultValue}
                      onChange={(e) => setMaxPrice(e.target.value)}
                   />  
              </Col>
           </Row>
           </Dropdown.Menu>
           </Dropdown>
        
    )
}

export default DropdownRange;