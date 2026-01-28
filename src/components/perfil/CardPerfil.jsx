import React from "react";
import { Card, Col } from "react-bootstrap";

function CardPerfil({ name, image, children, className, imgSize }) {

  return (
    <Card style={{ maxHeight: "320px" }} className={`mb-5 border-0`}>
      <div className="d-block mx-auto" style={{ zIndex: 10, position: "relative", }}>
        <Card.Img className="perfil-img" src={image || "https://dummyimage.com/300x300/dadada/"}
          style={{
            objectFit: 'contain',
            height: imgSize || '215px',
            width: imgSize || '215px',
            padding: "1rem",
            borderRadius: "100%",
            marginInline: "auto",
          }}
        />
        <div className="edit-pic-button bg-white rounded-circle border">
          <i class="bi bi-download"></i>
        </div>
      </div>


      <Card.Body
        style={{ position: "relative", textAlign: "center", paddingTop: "90px", top: "-85px" }} className="border rounded">
        <Card.Title
          className={`text-truncate-2 hover-link mb-2 fs-3 fw-semibold`}
          style={{
            height: "3.2rem",
            overflow: "hidden",
            textDecoration: "none",
          }}
        >
          {name || "N/A"}
        </Card.Title>
        <Card.Text className="fw-semibold mb-1">
          <span className="mx-2 text-success text-muted fw-medium fs-6">
            user@mail.com
          </span>
        </Card.Text>
        <Card.Text className="small fw-medium text-secondary">
        </Card.Text>
      </Card.Body>
      <div className="d-flex p-2">
        {children}
      </div>
    </Card>
  )
}

export default CardPerfil;