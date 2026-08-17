import{ IconNotify,  TintContainer } from "@/components/common/IconTintyColor";
import CenterLayout from "@/components/layout/CenterLayout";
import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import {CartIcon, CartIconTint } from "@features/cart/components/CartIcon.jsx";
import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function CartEmpty(){

    const cartEmpty = useRef(null)
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/products")
    }
    const msg = 'Add products to start your purchase.';


  return ( 
    <CenterLayout>    
        <FeedbackMessage
            title="Your cart is empty."
            message={msg}
            icon="bi-cart-x icn-xl"
            actionLabel="agregar al cart"
            onAction={goToHome}
        >  {{ "icon" : <CartIconTint />}}
       </FeedbackMessage>
    </CenterLayout> 
  )
}

export default CartEmpty;
