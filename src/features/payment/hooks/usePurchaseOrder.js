import { useState } from "react";
import { useService } from "@hooks/useService.js";
import { orderService } from "@features/order/services/orderService.js";
import { buyService } from '@features/payment/service/buyService.js';

export const usePurchaseOrder = ({orderData,setStep, setLoading, setError }) => {

    const [orderResponse, setOrderResponse] = useState()
    const {create: createOrder } = useService({service: orderService})
    const {create: buy }  = useService({service: buyService})


    const handleConfirmOrder = async() => {
       setError(null)
       setLoading(true)
       try {
          const order = await  createOrder(orderData);
          setOrderResponse(order)
          setStep(1) // <-- muestra formPayData
          console.log("-- ORDER VALIDA! --")
       } catch (error) {
          setError(true)
       } finally {
          setLoading(false)
       }

    }


    return ({handleConfirmOrder, buy})
}
