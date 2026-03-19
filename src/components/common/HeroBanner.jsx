import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function HeroBanner({image, children, variant}){

   const bgColor = `bg-${!variant ? 'white' : variant}`
   const textColor = `text-${variant && variant === 'white' || variant === 'light' ? 'dark' : 'light'}`

    return(
    <Container fluid="xl" className={`${bgColor}`}>
       <Row className="py-5">
        <Col className={`${bgColor} d-flex justify-content-between flex-wrap gap-5`}>
          <div className="order-md-2 flex-fill flex-md-grow-0">
            <img  className="d-block mx-auto" width={130} src={image} alt="" />
          </div>
          <div className={`order-md-1 flex-fill pt-md-3 pt-0  ${textColor}`}>
            {children}
          </div>
        </Col>
       </Row>
    </Container> 
    )
}

export default HeroBanner