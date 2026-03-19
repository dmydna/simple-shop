import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useScrollY } from "../../contexts/useWindowScroll.jsx";
import ActionBar from "../common/ActionBar.jsx";
import Logo from "../common/Logo.jsx";
import MobileMenu from "./MobileMenu.jsx";
import NavItems from "../common/NavItems.jsx";

function NavHeader({onSeleccion, items}) {

  const scrollY =  useScrollY()

  return (
    <Navbar
    bg="light" 
    expand="md"       
    className={`fixed-top transition bg-body-tertiary p-0
      ${scrollY >= 100 ? 'py-0 shadow-sm' : 'py-3'}` } 
    >
      <Container fluid="xl" className="align-items-center"> 
        <MobileMenu>
          <NavItems  
            items={items} 
            onSeleccion={onSeleccion} 
            className={'fw-semibold fs-5 fs-md-6 py-2 m-1'}
          />
        </MobileMenu>
        <Logo/>
        <ActionBar/>
        <Nav className="d-none d-md-block order-md-1" id="basic-navbar-nav">
          <NavItems 
            items={items} 
            onSeleccion={onSeleccion} 
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
