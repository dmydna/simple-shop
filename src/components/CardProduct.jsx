import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

function CardProduct({title, image ,price, stock, id, children, className, cols, discount}){


    return(
        <Col className={`d-flex flex-column p-0
          ${cols ? cols : 'col-12 col-sm-6 col-md-4 col-lg-3'}`}>
           <Card className={`${className || 'm-2'}`}>
              <Link 
                className="text-decoration-none text-reset p-0"
                to={`/productos/details/${encodeURIComponent(title)}`}
              >
              <Card.Img   src={image || "https://dummyimage.com/300x300/fff/000&text=Image+not+found"}
                    style={{ 
                      objectFit: 'contain', 
                      height: '180px', 
                      padding: "1rem" 
                    }}
              />
              <Card.Body>
                <Card.Title 
                    className={`text-truncate-2 hover-link mb-2 fs-6 fw-semibold `}
                    style={{
                      height: "3.2rem", 
                      overflow: "hidden", 
                      textDecoration: "none", 
                    }}
                >
                   {title || "N/A"}
                </Card.Title>
                <Card.Text className="fs-4 fw-semibold  mb-1">
                  $ {price || "N/A"}  
                  <span className="mx-2 text-success fw-medium fs-6">
                    {discount ? discount + '% OFF' : ''}
                  </span>
                </Card.Text>
                <Card.Text className="small fw-medium text-secondary">
                  stock: {stock || "N/A"}
                </Card.Text>
              </Card.Body>
              </Link>
              <div className="d-flex p-2">
                {children}
              </div>
            </Card>
        </Col>
    )
}

export default CardProduct