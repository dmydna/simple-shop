import { useMemo, useState } from "react";
import { useService } from "../../../contexts/useService.js";
import { useCart } from "../../cart/contexts/CartContext.jsx";
import { orderService } from "../../order/services/orderService.js";
import { useProfile } from "../../profile/hooks/ProfileContext.jsx";
import { buyService } from '../service/buyService.js';
import { gatewayService } from '../service/gatewayService.js';
import { useGateway } from '../hooks/useGateway.js';

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
