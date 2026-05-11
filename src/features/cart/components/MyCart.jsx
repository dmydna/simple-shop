import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useCart } from "../contexts/CartContext.jsx";
import CartClearModal from "./CartClearModal.jsx";
import CartItem from "./CartItem.jsx";
import { useWarning } from "@/hooks/useWarning.js";

export const MyCart = ({ children, className }) => {

    const [showClearCart, setShowClearCart] = useState(false)
    const { clearCart, cartItems } = useCart();
    const {completeRegistration} = useWarning();

    const handleClearCart = () => {
        clearCart()
    }

    return (
        <>
            {!completeRegistration && (
                    <Alert variant="danger mx-2">
                        <i className="bi bi-exclamation-triangle me-3"></i>
                        Para usar esta caracterisca completa el proceso registro registro.
                        <b  onClick={() => navigate('/register/complete')} className=" text-decoration-underline pointer mx-2" href="/complete-register">completar</b>  
                    </Alert>
            )}

            <Card className={`m-2 ${className}`}>
                <div className="d-flex align-items-center justify-content-between">
                    {children}
                    <i onClick={() => setShowClearCart(true)}
                        style={{ fontSize: "xx-large" }} className="bi bi-x hover-icon"></i>
                </div>

                <CartClearModal
                    show={showClearCart}
                    onHide={setShowClearCart}
                    handle={handleClearCart}
                />
                <hr />
                {cartItems.map((item, index) => (
                    <CartItem
                        item={item}
                        index={index}
                    />
                ))}
            </Card>
        </>)

}