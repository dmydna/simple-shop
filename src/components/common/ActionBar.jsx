import { Nav, Button } from "react-bootstrap";
import CartButton from "@features/cart/components/CartButton.jsx";
import SearchOverlay from "@features/search/SearchOverlay";
import UserDropdown from "@features/user/components/UserDropdown.jsx";
import { useUIContext } from "../../contexts/UIContext.jsx";



function ActionBar(){

  const { showMenu, onHideMenu } = useUIContext()

    return(
        <Nav className={`align-items-center flex-row order-md-2`}>
          <SearchOverlay/>
          <UserDropdown />
          <div className="d-none d-md-block">
              <CartButton/>               
          </div>
          <Button className='d-block d-md-none' onClick={()=> onHideMenu(prev=>!prev)} variant='light'>
              <i className='bi bi-three-dots'></i>
          </Button>

        </Nav>
    )
}

export default ActionBar