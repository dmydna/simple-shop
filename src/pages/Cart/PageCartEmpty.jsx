import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import React from "react";

function PageCartEmpty(){

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/productos")
    }
    const msg = 'Agregá productos para comenzar tu compra.';
    return (
        <FeedbackMessage
            title="Tu carrito está vacío"
            message={msg}
            icon="bi-cart-x icn-xl"
            actionLabel="agregar al carrito"
            onAction={goToHome}
        />
    )
}

export default PageCartEmpty;
