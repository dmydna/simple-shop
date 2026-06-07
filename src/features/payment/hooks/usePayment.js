import { useCart } from "@/features/cart/contexts/CartContext.jsx";
import { useFetch } from "@hooks/useFetch.js";
import { useState } from "react";
import { useGateway } from '../hooks/useGateway.js';
import { usePurchaseOrder } from './usePurchaseOrder.js';

// HACK esta hook necesito revisarse para simplificar logica.
export const usePayment = () => {

    const {clearCart} = useCart()
    const [step, setStep] = useState(0)
    const [success, setSuccess] = useState(false)
    const [canceled, setCanceled] = useState(false)
    const {loading, setLoading, error, setError} = useFetch();


    const onSuccess = () => {
        if(canceled) clearCart();
        if(step === 1 && !canceled) {
            setSuccess(true)
            clearCart()
        }
        if(step !== 1) setStep(1)
    }

    const { handleConfirmOrder, buy, orderResponse, handleCancel }
        = usePurchaseOrder({ onSuccess, setLoading, setError })

    const { handleConfirmPay }  = useGateway({ buy, setLoading, setError, onSuccess, orderResponse })


    return ({
        loading, error, setLoading, setError,
        step, setStep,
        handleConfirmOrder, // handleFinal purchar Order
        handleConfirmPay, // handleFinal paymentForm
        handleCancel,
        canceled,
        success,
        cartStep: Object.freeze({ CART: 0, PAY: 1 }),
    })
}
