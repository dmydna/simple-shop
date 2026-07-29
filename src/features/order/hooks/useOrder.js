import { orderService } from "../services/orderService.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useOrder = () => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: orderService, size: 8 })

    const { loading: loadingItem, error: errorItem, setError: setErrorItem ,currentItem, setCurrentItem, id, setId, refreshElem }
        = useFetchElem({ fetchMethod: orderService.getById })



    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error: errorList || errorItem,
        orders: content,
        setOrders: setContent,
        currentOrder: currentItem,
        setCurrentOrder: setCurrentItem,
        orderHash: id,
        setOrderHash: setId,
        setErrorItem,
        refreshElem
    })
}
