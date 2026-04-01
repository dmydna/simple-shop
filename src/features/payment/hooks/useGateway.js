import { useMemo, useState } from "react";
import { gatewayService } from '../service/gatewayService.js';
import { useService } from "../../../contexts/useService.js";
import { useCart } from "../../cart/contexts/CartContext.jsx";

export const useGateway = ({orderId, clientId , buy, setLoading, setError, setSuccess}) => {

    const {clearCart} = useCart()
    const [validToken, setValidToken] = useState(false)
    const [tokenGateway, setTokenGateway] = useState(null)
    const {create: paymentRequest } = useService({service: gatewayService})

    const handleGatewayRequest = async() => {
        setLoading(true)
        setError(null)
        try {
            const token = await paymentRequest({
                "orderId": `${orderId}`,
                "clientId": `${clientId}`,
            })
            setTokenGateway(token)
            console.log(token, "-- GATEWAY REQUEST [OK] --")
        }catch(error){
            setError(true)
            console.log(error, "-- GATEWAY REQUEST [FAIL] --")
            throw new Error(error);
        }finally{
            setLoading(false)
        }
    }

    const tokenGatewayRequest = useMemo(()=>(
     {
      "orderId": `${orderId || 0}`, 
      "paymentToken": `${tokenGateway}` 
     }), [orderId, tokenGateway])

    const handleValidateGateway = async()=>{
        setLoading(true)
        setError(null)
        try{
           const response = await buy(tokenGatewayRequest)
           console.log(response, "-- FINISH BUY [OK] --")
           setLoading(false)
           setSuccess(true)
           clearCart()
        }catch(error){
           console.log(error, "-- FINISH BUY [FAIL] --")
           setError(true)
           throw new Error(error);
        }finally{
           setLoading(false)
        }
    }

    const handleConfirmPay = async() =>{
        try {
          await handleGatewayRequest()
          await handleValidateGateway()
        }
        catch(err){
        }

    }


    return ({
      handleConfirmPay // <-- handleFinal
    })

}
