import { useEffect, useMemo, useState } from "react";
import { favoriteService } from "../services/favoriteService.js";
import { useFetchById } from "@hooks/useFetchById.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useService } from "@hooks/useService.js";

export const useFavorite = () => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: favoriteService, size: 8 })

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, itemHash, setItemHash }
        = useFetchById({ service: favoriteService })

    const { Delete: deleteFavorite, create :createFavorite } = useService({service: favoriteService})

    return ({
        ...props,
        deleteFavorite,
        createFavorite,
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
