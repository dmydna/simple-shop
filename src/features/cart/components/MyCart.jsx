import CartClearModal from "./CartClearModal.jsx";
import CarritoItem from "./CartItem.jsx";
import {Card} from "react-bootstrap";
import React, {useState} from "react";
import {useCart} from "../contexts/CartContext.jsx";

export const MyCart = ({children, className}) => {

    const [showClearCart, setShowClearCart] = useState(false)
    const {clearCart, cartItems} = useCart()

    const handleClearCart = () => {
        clearCart()
    }

    return(
    <Card className={`m-2 ${className}`}>
        <div className="d-flex align-items-center justify-content-between">
            {children}
            <i onClick={() => setShowClearCart(true)}
               style={{fontSize: "xx-large"}} className="bi bi-x hover-icon"></i>
        </div>

        <CartClearModal
            show={showClearCart}
            onHide={setShowClearCart}
            handle={handleClearCart}
        />
        <hr/>
        {cartItems.map((item, index) => (
            <CarritoItem
                item={item}
                index={index}
            />
        ))}
    </Card>)
}