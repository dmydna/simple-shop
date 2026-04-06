import { useProfile } from "@/features/profile/contexts/ProfileContext";
import { gatewayService } from "@features/payment/service/gatewayService.js";
import { useService } from "@hooks/useService.js";
import { useState } from "react";

export const useGateway = ({buy, setLoading, setError, onSuccess, orderResponse}) => {

    const {profile} = useProfile()
    const [validToken, setValidToken] = useState(false)
    const [tokenGateway, setTokenGateway] = useState(null)
    const {create: paymentRequest } = useService({service: gatewayService})

    const handleGatewayRequest = async() => {
        setLoading(true)
        setError(null)
        try {
            const token = await paymentRequest(
                { "orderId": orderResponse.orderId,  "userEmail": profile.email }
            )
            setTokenGateway(token)
            console.log(token, "-- GATEWAY REQUEST [OK] --")
            return  (
                { "orderId": orderResponse.orderId , "paymentToken" : token }
            )
        }catch(error){
            setError(true)
            console.log(error, "-- GATEWAY REQUEST [FAIL] --")
            throw new Error(error);
        }finally{
            setLoading(false)
        }
    }

    const handleValidateGateway = async(tokenRequest)=>{
        setLoading(true)
        setError(null)
        try{
           const response = await buy(tokenRequest)
           console.log(response, "-- FINISH BUY [OK] --")
           setLoading(false)
           onSuccess()
           setError(false)
        }catch(error){
           console.log(error, "-- FINISH BUY [FAIL] --")
           setError(true)
           throw new Error(error);
        }finally{
           setLoading(false)
        }
    }

    const handleConfirmPay = async() => {
        try {
          const tokenRequest = await handleGatewayRequest()
          await handleValidateGateway(tokenRequest)
        }
        catch(err){
        }

    }


    return ({
      handleConfirmPay, 
    })

}
