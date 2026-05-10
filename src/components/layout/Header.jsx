import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useWindowsWidth } from "../../contexts/useWindowSize.jsx";
import Search from "../Search";
import UserDropdown from "../UserDropdown";

// @deprecated
function Header() {

  const location = useLocation();
  const width = useWindowsWidth()

  // TODO : arreglar esto, logica de Search.jsx en Header.jsx

  const [toggleBarraBusqueda, setToggleBarraBusqueda] = useState(false);


  const toggleBarraBusquedaActiva = width <= 1300 && toggleBarraBusqueda

  useEffect(() => {
    if (width >= 1300 && toggleBarraBusqueda) {
      setToggleBarraBusqueda(false);
    }
  }, [width, toggleBarraBusqueda]);
  

  return (
    <Navbar bg="dark" variant="dark" className="px-0 px-sm-3">
      <Container>
        
        <Navbar.Brand as={Link} to="/"
          className={`p-0 ${( toggleBarraBusquedaActiva ? 'd-none' : '' )}`}
        >
          <i className={`bi bi-bag-heart-fill ${width <= 500 ?  'h1' : 'h4'} `}>
          </i>
          <b> {(width <= 320 ?  '' : 'Simple SHOP' )}</b>
        </Navbar.Brand>
        <div className="d-flex w-100 m-0 p-0 justify-content-end">
        {(width >= 1300 ?  <Search /> : '' )} 
        <div className={`${ toggleBarraBusquedaActiva ? 'd-block w-100' : 'd-flex' } `}>
          <div className={`${toggleBarraBusquedaActiva ? 'd-none' : '' } `} >
             {location.pathname != '/auth' ? <UserDropdown /> : '' }
          </div>
          {(width < 1300 ?  < Search   toggle={toggleBarraBusqueda} setToggle ={setToggleBarraBusqueda} /> : '' )} 
        </div>
        </div>

 

      </Container>
    </Navbar>
  );
}

export default Header;
