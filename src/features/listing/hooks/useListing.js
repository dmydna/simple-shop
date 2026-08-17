import { useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData.js";
import { listingService } from "@features/listing/services/listingService.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useListing = ({autofetch=false, size=8, ...config}={}) => {
    

    const [products, setProducts] = useState([])

    const {loading: loadingList, error: errorList, content, setContent, ...props}
        = useFetchData({service: listingService, autofetch, size, ...config})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, refreshElem }
        = useFetchElem({fetchMethod: listingService.getByHash})

    return ({
        ...props ,
        products, setProducts,
        id, setId, 
        setCurrentItem, currentItem,
        content, setContent,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        refreshElem,
        /* Custom Name */
        listings: content, 
        setListings: setContent,
        currentListing: currentItem, 
        setCurrentListing: setCurrentItem,
        listingHash: id, 
        setListingHash: setId,
        itemHash: id, 
        setItemHash: setId,
    })
}
