import { useFetchElem } from "@/hooks/useFetchElem.js";
import { useFetchData } from "@hooks/useFetchData.js";
import { useService } from "@hooks/useService.js";
import { reviewService } from "../services/reviewService.js";

export const useReview = () => {

    const { loading: loadingList, error: errorList, content, setContent, totalElements, setFilters, ...props }
        = useFetchData({ service: reviewService, size: 8 })

    const { loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId }
        = useFetchElem({ fetchMethod: reviewService.getById })

    const { createReview, 
      loading: loadingCreate, 
      setError: setErrorCreate, 
      error: errorCreate, success: successCreate, setSuccess: setSuccessCreate } = useService({service: reviewService})


    return ({
        ...props,
        setFilters,
        content,
        loading: loadingList || loadingItem,
        error: errorList || errorItem,
        createReview, loadingCreate, setErrorCreate, errorCreate, 
        successCreate, setSuccessCreate
    })
}
