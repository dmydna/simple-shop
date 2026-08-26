import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNavbarContext } from "@/contexts/NavbarContext";
import { URL_CONTACT } from "@/utils/links";

function NavItems({items, onSeleccion, className}){

  const navigate = useNavigate()

  
    const {setShowMenu, showMenu} = useNavbarContext()



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
            onClick={()=> navigate(`${window.location.pathname}?dialog=contact`)}
        >
          Contact
        </Nav.Link>
      </Nav>
    )
}


export default NavItems