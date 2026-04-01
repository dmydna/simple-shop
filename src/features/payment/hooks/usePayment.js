import { useMemo, useState, useEffect } from "react";
import { useService } from "../../../contexts/useService.js";
import { useFetch } from "../../../contexts/useFetch.jsx";
import { useCart } from "../../cart/contexts/CartContext.jsx";
import { orderService } from "../../order/services/orderService.js";
import { useProfile } from "../../profile/hooks/ProfileContext.jsx";
import { buyService } from '../service/buyService.js';
import { gatewayService } from '../service/gatewayService.js';
import { useGateway } from '../hooks/useGateway.js';
import { usePurchaseOrder } from '../hooks/usePurchaseOrder.js';

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
