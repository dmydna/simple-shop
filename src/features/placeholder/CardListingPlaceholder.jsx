import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export const CardListingPlaceholder = () => {
  return (
    <Col className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card mb-3 border island" aria-hidden="true">
        {/* Imagen del Placeholder con animación de onda */}
        <div className="placeholder-wave">
          <div className="card-img-top placeholder" style={{ height: '180px', backgroundColor: '#e9ecef' }}></div>
        </div>

        <div style={{opacity:'.3'}} className="card-body">
          {/* Título */}
          <h5 className="card-title placeholder-glow">
            <span className="placeholder rounded col-6"></span>
          </h5>

          {/* Descripción (varias líneas) */}
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
          </p>

          {/* Botón */}
          <span className="placeholder-glow">
            <a className="btn bg-dark placeholder col-12 disabled" aria-disabled="true"></a>
          </span>
        </div>
      </div>
    </Col>

  );
};
