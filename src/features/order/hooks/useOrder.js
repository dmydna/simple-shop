import { useEffect, useMemo, useState } from "react";
import { orderService } from "../services/orderService.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useOrder = () => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: orderService, size: 2 })

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId }
        = useFetchElem({ service: orderService })



    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error: errorList || errorItem,
        orders: content,
        setOrders: setContent,
        currenOrder: currentItem,
        setCurrenOrder: setCurrentItem,
        orderHash: id,
        setOrderHash: setId,
    })
}