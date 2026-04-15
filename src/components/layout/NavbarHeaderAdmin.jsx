import { Container, Nav, Navbar } from "react-bootstrap";
import { useScrollY } from "../../contexts/useWindowScroll.jsx";
import UserDropdown from "../common/UserDropdown.jsx";
import MobileMenu from "./MobileMenu.jsx";

function NavHeaderAdmin({onSeleccion, items}) {

  const scrollY =  useScrollY()

  return (
    <Navbar
    bg="light" 
    expand="md"       
    className={`fixed-top transition bg-body-tertiary`} 
    >
      <Container fluid="xxl" className="align-items-center"> 
        <MobileMenu>
          {/* <NavItems  
            items={items} 
            onSeleccion={onSeleccion} 
            className={'fw-semibold fs-5 fs-md-6 py-2 m-1'}
          /> */}
        </MobileMenu>
        {/* <Logo/> */}
        {/* <ActionBar/> */}
        <Nav className={`align-items-center flex-row order-md-2`}>
            <UserDropdown />
        </Nav>
        <Nav className="d-none d-md-block order-md-1" id="basic-navbar-nav">
          {/* <NavItems 
            items={items} 
            onSeleccion={onSeleccion} 
          /> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavHeaderAdmin;
