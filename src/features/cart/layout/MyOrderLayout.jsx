import CartNavButton from "@/features/cart/components/CartNavButton";
import { MyOrderCart } from "@features/cart/components/MyOrderCart.jsx";
import { MyOrderCartPlaceHoder } from "@features/placeholder/MyOrderCartPlaceHolder.jsx";
import { useState } from "react";
import { usePaymentContext } from "@f/payment/contexts/PaymentContext";



function MyOrderLayout() {


    const { loading, error,  handleConfirmOrder, handleConfirmPay, handleCancel,
    step, success, cartStep } = usePaymentContext()

	const [cuponCheck, setCuponCheck] = useState(false)
	

	const confirmAction = (func) => {
		window.scrollTo({ top: 0, behavior: 'instant'});
		func()
	}

	return (
	<>
	{ loading || error && (<MyOrderCartPlaceHoder />)}

	{!error && !loading && (

		<div style={{ top: '66px' }} className="sticky-md-top">
              
			<MyOrderCart
				handle={handleConfirmOrder}
				oncheck={setCuponCheck}
				check={cuponCheck}>
			</MyOrderCart>

			<div style={{ marginTop: '10px' }} className="border p-3 mx-0 mx-md-2 d-flex justify-content-center gap-3 island">

				<CartNavButton  
					visible={!success} 
					handle={()=>confirmAction(handleCancel)}
					variant="light"
					title="Cancelar" 
				/>

				<CartNavButton  
					visible={step == cartStep.CART && !success} 
					handle={()=>confirmAction(handleConfirmOrder)} 
					title="Continuar" 
				/>

				<CartNavButton  
					visible={step == cartStep.PAY && !success} 
					handle={()=>confirmAction(handleConfirmPay)} 
					title="Confirmar Compra" 
				/>

				<CartNavButton  
					visible={success} 
					variant="success disabled"
					title="PAGADO" 
					icon="bi bi-check-circle me-2"
				/>

			</div>
		</div>
	)}

	</>)
}

export default MyOrderLayout;