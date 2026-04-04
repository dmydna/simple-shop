import { useState } from "react";
import { useFetch } from "@hooks/useFetch.js";
import { useCart } from "@features/cart/contexts/CartContext.jsx";
import { useProfile } from "@features/profile/contexts/ProfileContext.jsx";
import { useGateway } from '../hooks/useGateway.js';
import { usePurchaseOrder } from './usePurchaseOrder.js';

export const usePayment = () => {

    const { profile } = useProfile()
    const { orderData } = useCart()
    const [step, setStep] = useState(0)
    const [success, setSuccess] = useState(false)
    const {loading, setLoading, error, setError} = useFetch();

    const { handleCheckOrder, validOrder, validPay , create, orderResponse, setOrderResponse, buy, handleConfirmOrder }
        = usePurchaseOrder({ orderData, setStep, setLoading, setError })

    const { handleConfirmPay }  = useGateway({ 
       "orderId": orderResponse?.id || 2, 
       "clientId": profile?.id || 2, 
       buy, 
       setLoading, 
       setError,
       setSuccess 
      })





    return ({
        validOrder, validPay,
        create,
        buy,
        loading, error, setLoading, setError,
        step, setStep,
        handleConfirmOrder, // handleFinal purchar Order
        handleConfirmPay, // handleFinal paymentForm
        success
    })
}
