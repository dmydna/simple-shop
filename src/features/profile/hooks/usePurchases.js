import { useFetchData } from "@hooks/useFetchData.js";
import { orderService } from "@/features/order/services/orderService";



export const usePurchases = () => {

    const config = {
        service: orderService, 
        methodName: "getMyPurchases",
        size: 8
    } 
    
    const { loading: loadingList, error: errorList, content, setContent, 
    totalElements, setFilters, ...props } = useFetchData(config)


    return ({
        ...props,
        content,
        loading: loadingList,
        error: errorList,
        orders: content,
        setOrders: setContent,
        totalElements, setFilters
    })
}