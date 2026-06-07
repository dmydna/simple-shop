import { useFetchElem } from "@/hooks/useFetchElem.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useService } from "@hooks/useService.js";
import { reviewService } from "../services/reviewService.js";

export const useReview = ({...config}={}) => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: reviewService, ...config })

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, setError: setErrorItem }
        = useFetchElem({ fetchMethod: reviewService.getById })


    const { createReview, loading, setError, error, success, setSuccess, ...services} = useService({service: reviewService})


    return ({
        ...props,
        ...services,
        setFilters,
        content, setContent, totalElements, setId, id,
        currentItem, setCurrentItem,
        loading: loadingList || loadingItem || loading,
        error: errorList || errorItem || error,
        createReview, setError, 
        success, setSuccess,
        setErrorItem
    })
}
