import { useState } from "react";
import { Card } from "react-bootstrap";
import { useCart } from "../contexts/CartContext.jsx";
import CartClearModal from "./CartClearModal.jsx";
import CartItem from "./CartItem.jsx";

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
            <CartItem
                item={item}
                index={index}
            />
        ))}
    </Card>)
}