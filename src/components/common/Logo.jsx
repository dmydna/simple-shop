import React from "react";
import {Navbar} from "react-bootstrap";
import { Link} from "react-router-dom";

function Logo(){

    const subLogo = {color: '#dc3545', fontSize: 'medium', fontWeight: '800'}

    return(
        <Navbar.Brand as={Link} to="/" className={`p-0`}>
          <b className="h3 fw-bolder text-black">Simple</b>
          <b className="text-danger" style={subLogo}> SHOP</b>
        </Navbar.Brand>
    )
}

export default Logo;