import {useState} from "react";
import {listingService} from "../services/listingService.js";
import {useFetchByHash} from "../../../contexts/useFetchByHash.jsx";
import {useFetchData} from "../../../contexts/useFetchData.js";

export const useListing = () => {

    const [products, setProducts] = useState([]);
    const {loading: loadingList, error: errorList, content,setContent, ...props}
        = useFetchData({service: listingService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, itemHash, setItemHash }
        = useFetchByHash({service: listingService})

    return ({
        ...props ,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        listings: content,
        setListings: setContent,
        currentListing: currentItem,
        setCurrentListing: setCurrentItem,
        listingHash: itemHash,
        setListingHash: setItemHash,
        products, setProducts,
    })
}