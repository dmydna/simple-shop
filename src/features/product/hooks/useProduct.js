import { useFetchElem } from "@/hooks/useFetchElem.js";
import { useFetchData } from "../../../hooks/useFetchData.js";
import { productService } from "../services/productService.js";

export const useProduct = () => {

    const {loading: loadingList, error: errorList, content, setContent, ...props}
        = useFetchData({service: productService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, fetchElem, refreshElem }
        = useFetchElem({fetchMethod: productService.getById})

    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        products: content,
        setProducts: setContent,
        currentProduct: currentItem,
        setCurrentProduct: setCurrentItem,
        setCurrentItem,
        productId: id,
        setProductId: setId,
        setId, id,
        fetchElem,
        refreshElem
    })
}
