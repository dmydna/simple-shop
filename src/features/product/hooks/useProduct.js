import { useFetchElem } from "@/hooks/useFetchElem.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { productService } from "@f/product/services/productService.js";

export const useProduct = ({autofetch=false}={}) => {

    const {loading: loadingList, error: errorList, content, setContent, ...props}
        = useFetchData({service: productService, autofetch: autofetch})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, refreshElem }
        = useFetchElem({fetchMethod: productService.getById})


    return ({
        ...props,
        setId, id, 
        content, setContent,
        setCurrentItem,currentItem,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        refreshElem,
        /* Custom Name */
        products: content,
        setProducts: setContent,
        currentProduct: currentItem,
        setCurrentProduct: setCurrentItem,
        productId: id,
        setProductId: setId,
    })
}
