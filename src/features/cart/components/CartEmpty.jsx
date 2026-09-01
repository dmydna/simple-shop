import CenterLayout from "@/components/layout/CenterLayout";
import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";


function CartEmpty(){


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
        >
       </FeedbackMessage>
    </CenterLayout> 
  )
}

export default CartEmpty;
