import React from "react";
import {productService} from "../service/productService.js";
import {useFetchData} from "../../../contexts/useFetchData.js";
import {useFetchById} from "../../../contexts/useFetchById.js";

export const useProduct = () => {

    const {loading: loadingList, error: errorList, content,setContent, ...props}
        = useFetchData({service: productService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, itemId, setItemId }
        = useFetchById({service: productService})

    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        products: content,
        setProducts: setContent,
        currentProduct: currentItem,
        setCurrentProduct: setCurrentItem,
        productId: itemId,
        setProductId: setItemId,
    })
}