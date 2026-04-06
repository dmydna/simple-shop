import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";

function PageCartEmpty(){

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/products")
    }
    const msg = 'Agregá productos para comenzar tu compra.';
    return (
        <FeedbackMessage
            title="Tu cart está vacío"
            message={msg}
            icon="bi-cart-x icn-xl"
            actionLabel="agregar al cart"
            onAction={goToHome}
        />
    )
}

export default PageCartEmpty;
