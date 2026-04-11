import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";
import CartIcon from "@features/cart/components/CartIcon.jsx"


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
        > {{ "icon" : <CartIcon scale=".7" opacity=".3" />  }}
       </FeedbackMessage>
    )
}

export default PageCartEmpty;
