import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUIContext } from "../../contexts/UIContext";

function NavItems({items, onSeleccion, className}){

  const navigate = useNavigate()

    const {onHideContact, onHideMenu, showMenu} = useUIContext()


    const handleContact = () =>{ 
      !showMenu ? 
      onHideContact(true) : 
      navigate('/contacto'), 
      onHideMenu(false)
    }
    const handleClick = (item) => {  
      onSeleccion(item) ;
      showMenu &&
      onHideMenu(false)
    }
  
    return(
        <Nav className="me-auto w-100 align-items-left">
        {items.map((item) =>
          item != "Contacto" && 
          <Nav.Link 
            className={className}
            as={Link} to={item.toLowerCase()} key={item} 
            onClick={handleClick}
          >  
            {item}
          </Nav.Link>
        )}
        <Nav.Link 
            className={className}
            onClick={handleContact}
        >
          Contacto
        </Nav.Link>
      </Nav>
    )
}


export default NavItems