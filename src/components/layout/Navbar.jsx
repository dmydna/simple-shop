import { Container, Nav, Navbar as NavBar  } from "react-bootstrap";
import { useScrollY } from "../../contexts/useWindowScroll.jsx";
import ActionBar from "../common/ActionBar.jsx";
import Logo from "../common/Logo.jsx";
import NavItems from "../common/NavItems.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { NavbarProvider } from "@/contexts/NavbarContext.jsx";
import { useState } from "react";



// TODO: renombrar a nav y eliminar legacies similares.
function Navbar({ onSeleccion, items }) {

  const isScrollY = useScrollY()
  const [showMenu, setShowMenu] = useState()


  return (
    <NavbarProvider
      showMenu={showMenu}
      setShowMenu={setShowMenu}
    >
      <NavBar
        id="navbar"
        bg="light" 
        expand="md"       
        className={`Navbar fixed-top transition bg-body-tertiary p-0
      ${ isScrollY ? 'py-0 shadow-sm' : 'py-3'}`} 
      >
        <Container fluid="xl" className="small align-items-center"> 
          <MobileMenu>
            <NavItems  
              items={items} 
              onSeleccion={onSeleccion} 
              className={'fw-semibold fs-5 fs-md-6 py-2 m-1'}
            />
          </MobileMenu>
          <Logo />
          <ActionBar />
          <Nav className="d-none d-md-block order-md-1" id="basic-navbar-nav">
            <NavItems 
              items={items} 
              onSeleccion={onSeleccion} 
            />
          </Nav>
        </Container>
      </NavBar>
    </NavbarProvider>
  );
}

export default Navbar;
