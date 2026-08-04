import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNavbarContext } from "@/contexts/NavbarContext";

function NavItems({items, onSeleccion, className}){

  const navigate = useNavigate()

  
    const {onHideContact, setShowMenu, showMenu} = useNavbarContext()


    const handleContact = () =>{ 
      !showMenu ? 
      onHideContact(true) : 
      navigate('/contacto'), 
      setShowMenu(false)
    }
    const handleClick = (item) => {  
      onSeleccion(item) ;
      showMenu &&
      setShowMenu(false)
    }
  
    return(
        <Nav className="me-auto w-100 align-items-left">
        {items.map((item) =>
          item != "Contact" && 
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
          Contact
        </Nav.Link>
      </Nav>
    )
}


export default NavItems