import { usePaymentContext } from "@/features/payment/contexts/PaymentContext";
import PageError from "@features/fallback/PageError";
import PageLoading from "@features/fallback/PageLoading";
import PageSuccess from "@features/fallback/PageSuccess";
import { MyCart } from "@features/cart/components/MyCart";
import { useCart } from "@features/cart/contexts/CartContext";
import PaymentForm from "@features/payment/components/PaymentForm";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyCartLayout() {
	
	const { cartItems, clearCart } = useCart()
	const navigate = useNavigate();
	const { loading, error, setError, step, success, canceled, cartStep } 
	= usePaymentContext()

	const handleSucess = () => {
		navigate('/')
		clearCart()
	}


	return (<>

		{step == cartStep.CART && (
			<>
				{!loading && !error && (
					<MyCart className="p-4 island">
						<p className="h5 fw-bold pt-3">
							Mi cart({cartItems.length})
						</p>
					</MyCart>
				)}
			</>
		)}

		{step == cartStep.PAY && (
			<>
				{!loading && !error && !success && (<PaymentForm />)} 
			</>
		)}


		{loading && (
			<Card className="p-4 island">
				<PageLoading />
			</Card>
		)}
		{success && (
			<Card className="p-4 island mb-2 h-100 border align-items-center justify-content-center d-flex">
				<PageSuccess handle={handleSucess} />
			</Card>
		)}
		{error && (
			<div className="p-4 island mb-2 h-100 border align-items-center justify-content-center d-flex">
				<PageError  handle={() => setError(null)} />
			</div>
		)}
		{canceled && (
			<Card className="p-4 island mt-2">
				<PageSuccess handle={() => navigate('/')} />
			</Card>
		)}
	</>)
}

export default MyCartLayout;