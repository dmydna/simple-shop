import { useEffect, useMemo, useState } from "react";
import { reviewService } from "../services/reviewService.js";
import { useFetchById } from "@hooks/useFetchById.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useService } from "@hooks/useService.js"

export const useReview = () => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: reviewService, size: 8 })

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, itemHash, setItemHash }
        = useFetchById({ service: reviewService })

    const { Delete: deleteFavorite } = useService({service: reviewService})


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
