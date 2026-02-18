import React from "react";
import { Nav } from "react-bootstrap";
import CartButton from "../../features/cart/components/CartButton.jsx";
import SearchOverlay from "../../features/search/SearchOverlay";
import UserDropdown from "./UserDropdown";




function ActionBar(){

    return(
        <Nav className={`align-items-center flex-row order-md-2`}>
          <SearchOverlay/>
          <UserDropdown />
          <CartButton/> 
        </Nav>
    )
}

export default ActionBar