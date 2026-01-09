import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from "./Logo";


import SearchOverlay from "../search/SearchOverlay";
import CartButton from "./CartButton";


function MobileMenuDos({children}) {


    const { user, token, login, logout } = useAuth();
    const isAuth = token && user ? true : false

    const [showModal, onHideModal] = useState(false)

  const expand = "md"
  return (
    <>
  <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container>
            <Logo/>
            <Nav className="justify-content-end flex-grow-1 pe-3 d-none d-md-block">
              {children}
            </Nav>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 d-none d-md-none">
              {children}
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                 <SearchOverlay/>
                 <CartButton/> 
                
              </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}




export default MobileMenuDos;