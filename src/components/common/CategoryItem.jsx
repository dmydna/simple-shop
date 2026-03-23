import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryItem({category, image, filter, link, className, variant, handleClick, description, col}){


    return (
        <>
    <Col className={`${col ? col: 'col-12 col-sm-6 col-md-4 col-lg-3'} `}>
    <Card  key={'category-' + category} className={`my-2 shadow-sm ${className}`} 
               style={{ 
                 borderLeft: "0", 
                 borderRight: "0", 
                 borderTop: "0" 
               }}
            >
              <div className={`d-flex rounded overflow-hidden`}>
                <div style={{width : 100,height: 'auto'}} className="p-3" >
                  <Card.Img 
                   style={{ objectFit: 'contain', width : 60,height: '60', filter: `${filter}` }}
                   className="mx-auto d-block"
                   src={image} />
                </div>
                <Col
                 style={{opacity:'.9'}}
                 className={`d-flex  flex-fill   ${!!variant ? `text-white bg-${variant}` : 'text-reset' }`}>
                   <Card.Title 
                    className="text-decoration-none "
                    as={Link}
                    to={link}
                    onClick={handleClick} >
                      <p className={`d-block text-uppercase small pt-4 mb-0
                        ${!!variant ? '' : 'hover-link'} fw-medium`}>
                          {category}
                      </p>
                      <small className="d-block text-secondary">{description}</small>
                    </Card.Title>
                </Col>
              </div>
            </Card>
    </Col>
    

        </>
    )
}

export default CategoryItem



