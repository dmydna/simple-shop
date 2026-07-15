import { useEffect, useMemo, useState } from "react";
import { favoriteService } from "../services/favoriteService.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useService } from "@hooks/useService.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useFavorite = ({autofetch=false}={}) => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: favoriteService, size: 8, autofetch: autofetch})

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId}
        = useFetchElem({ service: favoriteService })

    const { Delete: deleteFavorite, create :createFavorite, ...service } = useService({service: favoriteService})

    return ({
        ...props,
        ...service,
        deleteFavorite,
        createFavorite,
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
