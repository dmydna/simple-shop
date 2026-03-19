import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export const ImgPlaceholder = () => {
  return (
     <Col className="col-12 col-md-12 col-lg-7">
       <div className="card mb-3 mb-lg-0 border-0 h-100" aria-hidden="true">
        {/* Imagen del Placeholder con animación de onda */}
        <div className="placeholder-wave border island">
           <div className="card-img-top placeholder" 
                style={{ height: '380px', backgroundColor: '#e9ecef' }}>
           </div>
        </div>
      </div>
    </Col>
  );
};
