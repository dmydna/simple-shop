import { useEffect, useMemo, useState } from "react";
import { orderService } from "../services/orderService.js";
import { useFetchById } from "@hooks/useFetchById.js";
import { useFetchData } from "@hooks/useFetchData.js";

export const useOrder = () => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: orderService, size: 2 })

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, itemHash, setItemHash }
        = useFetchById({ service: orderService })



    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error: errorList || errorItem,
        orders: content,
        setOrders: setContent,
        currenOrder: currentItem,
        setCurrenOrder: setCurrentItem,
        orderHash: itemHash,
        setOrderHash: setItemHash,
    })
}