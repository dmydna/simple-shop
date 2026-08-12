import { useEffect, useState } from "react";
import { useProduct } from "@/features/product/hooks/useProduct.js";
import { productService } from '@/features/product/services/productService.js';
import { CRUD } from "@utils/enums.js";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { ProductDTO } from "@/utils/schemas";

export const useProductCrud = ({autofetch=false}={}) => {

    const { setCurrentItem, currentProduct, setId, id, loading: loadingItem, 
    error: errorItem, refreshElem, ...props} = useProduct({autofetch: autofetch});

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode]  = useState();
    const [scheme, setScheme] = useState(ProductDTO)
    
    const { ... formCrud } = useCrudForm(currentProduct, scheme, "create");

    const { handleCreate, handleUpdate, handleDelete,  handleStatus, 
        loading, setLoading, error, success, setError, setSuccess, ...actions
    } = useCrudActions({ service: productService });


    useEffect(()=>{
        console.log("ACA", currentProduct)
    },[currentProduct])


    return ({
        ...props,
        // Form
        ...formCrud,
        // Actions
        handleCreate,
        handleUpdate,
        handleDelete,
        handleStatus,
        // Fetch state
        loading: loadingItem || loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        errorItem,
        // Product
        dataItem,
        setDataItem,
        setId, id,
        crudMode, 
        setCrudMode, 
        showModal, 
        setShowModal,
        setCurrentItem,
        currentProduct,
        refreshElem,
        currentItem: currentProduct,

        scheme, setScheme,
        ...actions
    })
}
