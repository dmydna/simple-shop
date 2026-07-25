import { useEffect, useMemo, useState } from "react";
import { profileService } from "@f/profile/services/profileService.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const usePurchases = () => {

    const config = {
        service: profileService, 
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
    })
}