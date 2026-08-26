import { NavbarProvider } from "@/contexts/NavbarContext.jsx";
import DockbarToggle from "@/features/dockbar/components/DockbarToggle";
import ActionBar from "@common/ActionBar.jsx";
import Logo from "@common/Logo.jsx";
import NavItems from "@common/NavItems.jsx";
import { useScrollY } from "@contexts/useWindowScroll.jsx";
import MobileMenu from "@layout/MobileMenu.jsx";
import { useState } from "react";
import { Container, Nav, Navbar as NavBar } from "react-bootstrap";
//import { IconTint } from "@common/FloatButtonCollection";




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
      ${ isScrollY ? 'py-1 shadow-sm' : 'py-3'}`} 
      >
        <Container fluid="xl" className="small align-items-center"> 
          <DockbarToggle 
            className={"d-none d-md-block position-absolute"} 
            id={"dashbar-button"}
          />
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
