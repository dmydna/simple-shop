import { useCart } from "@/features/cart/contexts/CartContext";
import { orderService } from "@features/order/services/orderService.js";
import { buyService } from '@features/payment/service/buyService.js';
import { useService } from "@hooks/useService.js";
import { useState } from "react";

export const usePurchaseOrder = ({onSuccess, setLoading, setError, canceled , setCanceled }) => {

    const { cartItems } = useCart()
    const [orderResponse, setOrderResponse] = useState()
    const {create: createOrder, cancel: cancelOrder } = useService({service: orderService})
    const {create: buy }  = useService({service: buyService})


    // FIXME implementar usando  useCrudAction (handleCreate)
    const handleConfirmOrder = async() => {
       setError(null)
       setLoading(true)
       try {
          const order = await  createOrder(cartItems);
          setOrderResponse(order)
          onSuccess() // <-- muestra formPayData
          console.log(order, "-- ORDER VALIDA! --")
       } catch (err) {
          setError(err)
       } finally {
          setLoading(false)
       }
    }

   const handleCancel = async() =>{
       setError(null)
       setLoading(true)
       try{
          await cancelOrder(orderResponse.orderId);
          setCanceled(true)
          onSuccess()
          console.log(orderResponse, "-- CANCELED ORDER --")
      }catch(err){
          setError(err)
      } finally {
          setLoading(false)
       }
    }


    return ({handleConfirmOrder, buy, orderResponse, handleCancel, canceled})
}
