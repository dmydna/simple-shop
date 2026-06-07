import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HoverProvider } from "../../../contexts/HoverContext.jsx";
import HoverWrapper from "../../../contexts/HoverWrapper.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { Tintify } from "@features/product/components/FloatButton"




function CartButton(){

    const {cartCount} = useCart();
    const navigate = useNavigate();



    return(
        <div onClick={()=> navigate('/cart')} className="position-relative">
            <Tintify className="rounded-circle">
                <i className={`bi bi-cart3 fs-4`}></i>
            </Tintify>
               {cartCount != 0 ? 
                    <span className={`position-absolute bg-dark rounded-circle`}
                        style={{
                            fontWeight: 700, 
                            zIndex:100,
                            paddingLeft: cartCount > 9 ? 2 : 5, 
                            width:18, 
                            height:18, 
                            right: 5, 
                            top: 5 }}>
                        <p style={{zIndex: 999, fontSize: 13}} className="text-white">
                        {cartCount}
                        </p> 
                    </span> 
                : ''} 
        </div>
    )
}

export default CartButton;