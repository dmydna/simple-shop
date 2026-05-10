import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { HoverProvider } from "../../../contexts/HoverContext.jsx";
import HoverWrapper from "../../../contexts/HoverWrapper.jsx";
import { useCart } from "../contexts/CartContext.jsx";

function CartButton(){

    const navigate = useNavigate();
    const location = useLocation();

    const toggleRoute = () => { 
        location.pathname == '/cart' ? 
        navigate(-1) || navigate('/') : navigate('/cart')
      }

    const {cartCount} = useCart()


    return(
      <HoverProvider>
        <HoverWrapper id="cart-btn">
        {(isHovered) => (
         <Button 
         onClick={ toggleRoute } 
         className='fw-bold fs-4 d-flex' variant="outline-black">
            <i className={`bi bi-${ 
              isHovered && location.pathname == '/cart' ?
              'x' : 'cart3'  }`}>
            </i>
            {cartCount == 0 ? '' : 
            (isHovered && location.pathname == '/cart' ?
                '' : 
            <span className={`position-absolute bg-dark rounded-circle`}
               style={{width:18, height:18}}>
              <p style={{zIndex: 999, fontSize: 13}} className="text-white">
                {cartCount}
              </p>
            </span>  
            )}
        </Button>
        )}
        </HoverWrapper>
      </HoverProvider>
        
    )
}

export default CartButton;