import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export const CardDetailsPlaceholder = () => {
  return (
   <Col className="col-12 col-md-12 col-lg-5">

      <div className="card mb-3 border h-100 island" aria-hidden="true">
        <div style={{opacity:'.3'}} className="card-body h-100">
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
        </div>
        <div style={{opacity:'.3'}} className="card-body">
          {/* Botón */}
          <span className="placeholder-glow">
            <a className="btn bg-dark placeholder col-12 disabled" aria-disabled="true"></a>
          </span>
        </div>
      </div>
    </Col>

  );
};
