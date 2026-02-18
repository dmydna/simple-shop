import React from "react";
import { Nav } from "react-bootstrap";

function ContactButton(){

    return(
    <Nav.Link 
        className={className}
        onClick={handleContact}
    >
      Contacto
    </Nav.Link>
    )
}