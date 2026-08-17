import { Tintify } from "@/components/common/FloatButtonCollection";
import { useWarning } from "@/hooks/useWarning.js";
import CartClearModal from "@f/cart/components/CartClearModal.jsx";
import MyCartTable from "@f/cart/components/MyCartTable.jsx";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const MyCart = ({ children, className }) => {

    const [showClearCart, setShowClearCart] = useState(false)
    const { clearCart, cartItems } = useCart();
    const {completeRegistration} = useWarning();
    const navigate = useNavigate()

    const handleClearCart = () => {
        clearCart()
    }

    return (
        <>
            {!completeRegistration && (
                    <Alert variant="danger mx-2">
                        <i className="bi bi-exclamation-triangle me-3"></i>
                        Para usar esta caracterisca completa el proceso registro registro.
                        <b  onClick={() => navigate('/complete-register')} className=" text-decoration-underline pointer mx-2" href="/complete-register">completar</b>  
                    </Alert>
            )}

            <Card className={`m-2 ${className}`}>
                <div className="d-flex align-items-center justify-content-between">
                    {children}
                    <Tintify className="rounded-circle">
                    <i onClick={() => setShowClearCart(true)}
                        style={{ fontSize: "xx-large" }} className="bi bi-x hover-icon"></i>
                    </Tintify>
                </div>

                <CartClearModal
                    show={showClearCart}
                    onHide={setShowClearCart}
                    handle={handleClearCart}
                />
                <hr />
                <MyCartTable content={cartItems} />
            </Card>
        </>)

}