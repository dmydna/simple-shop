import React from "react";
import { Card, Col } from "react-bootstrap";
import {useUser} from "../hooks/UserContext.jsx";

function CardProfile({ name, image, children, className, imgSize }) {

  const { profile } = useUser()

  return (
    <Card  className={`mb-4 island border text-center`}>
      <div className="d-block mx-auto position-relative">
        <Card.Img className="perfil-img" src={profile?.image || "https://dummyimage.com/300x300/dadada/"}
          style={{
            objectFit: 'cover',
            height: imgSize || '215px',
            width: imgSize || '215px',
            padding: "1rem",
            borderRadius: "100%",
            marginInline: "auto",
          }}
        />
        <div style={{top: '150px', left:'140', position: "absolute"}}  className="edit-pic-button bg-white rounded-circle border">
          <i className="bi bi-download"></i>
        </div>
      </div>


      <Card.Body className="rounded">
        <Card.Title className='fs-3'>
          {name || "N/A"}
        </Card.Title>
        <Card.Text className="mb-3">
          <span className="text-secondary fs-6">
             {  profile?.email || 'user@mail.com' }
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardProfile;
