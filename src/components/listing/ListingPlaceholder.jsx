import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export const ListingPlaceholder = () => {
  return (
    <Col className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card mb-3" aria-hidden="true" style={{ width: '18rem' }}>
        {/* Imagen del Placeholder con animación de onda */}
        <div className="placeholder-wave">
          <div className="card-img-top placeholder" style={{ height: '180px', backgroundColor: '#e9ecef' }}></div>
        </div>

        <div className="card-body">
          {/* Título */}
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>

          {/* Descripción (varias líneas) */}
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
          </p>

          {/* Botón */}
          <a className="btn btn-primary disabled placeholder col-12" aria-disabled="true"></a>
        </div>
      </div>
    </Col>

  );
};