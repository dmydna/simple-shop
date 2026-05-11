import { useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData.js";
import { listingService } from "../services/listingService.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useListing = () => {
    

    const [products, setProducts] = useState([])

    const {loading: loadingList, error: errorList, content,setContent, ...props}
        = useFetchData({service: listingService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, refreshElem }
        = useFetchElem({fetchMethod: listingService.getByHash})


    return ({
        ...props ,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        listings: content,
        setListings: setContent,
        currentListing: currentItem,
        currentItem,
        setCurrentListing: setCurrentItem,
        listingHash: id,
        itemHash: id,
        setItemHash: setId,
        setListingHash: setId,
        setId, 
        setCurrentItem,
        id,
        products, setProducts,
        refreshElem
    })
}
