import React, { useState } from "react";
import { Nav as BootstrapNav, Container, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { HoverProvider } from "../../contexts/HoverContext";
import CartButton from "./CartButton";



function Nav({items, onSeleccion}) {

  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);
  const {cartCount} = useCart()


  const toggleRoute = () => { 
    location.pathname == '/carrito' ? 
    navigate(-1) || navigate('/') : navigate('/carrito')
  }

  // Desactiva nav sticky top mientra dropdown se muestra dropdown

  return (
    <HoverProvider>
    <Navbar 
      bg="light" 
      expand="md"       
      expanded={expanded}
      onToggle={(isOpen) => setExpanded(isOpen)}
      className={ 'sticky-top py-4 px-0'} >
      <Container fluid="xl" className="p-0">
        <Navbar.Toggle 
        aria-controls="basic-navbar-nav" />
        <BootstrapNav className='order-md-last'>
        <CartButton   />
        </BootstrapNav>
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto w-100  align-items-center">
            {items.map((item) =>
              <BootstrapNav.Link 
                as={Link} to={item.toLowerCase()} key={item} 
                onClick={() => { onSeleccion(item); setExpanded(false) }}
              >
                {item}
              </BootstrapNav.Link>
            )}
          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </HoverProvider>
  );
}

export default Nav;


