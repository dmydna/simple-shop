import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CarritoInput from "./CartInput";
import CarritoItem from "./CartItem";

function CategoryItem({category, image, link, className, variant}){



    return (
        <>
    <Col className="col-12 col-sm-6 col-md-4 col-lg-3">
    <Card  key={'category-' + category} className={`my-2 shadow-sm ${className}`} 
               style={{ 
                 borderLeft: "0", 
                 borderRight: "0", 
                 borderTop: "0" 
               }}
            >
              <div className={`d-flex flex-wrap rounded overflow-hidden`}>
                <div style={{width : 100,height: 'auto'}} className="p-3  border-end" >
                  <Card.Img 
                   style={{ objectFit: 'contain', width : 60,height: 'auto', filter: 'hue-rotate(327deg)' }}
                   className="mx-auto d-block"
                   src={image} />
                </div>
                <Col
                 style={{opacity:'.9'}}
                 className={`d-flex  flex-fill align-items-center ${!!variant ? `text-white bg-${variant}` : 'text-reset' }`}>
                  <Card.Body style={{maxWidth: "120px"}} className="ps-3 p-1">
                    <Card.Title 
                    as={Link}
                    className={`d-block text-uppercase small text-decoration-none 
                        ${!!variant ? '' : 'hover-link'} 
                        text-center fw-medium  h-100`}
                    to={link} >
                      {category}
                    </Card.Title>
                  </Card.Body>
                </Col>
              </div>
            </Card>
    </Col>
    

        </>
    )
}

export default CategoryItem




