import { useEffect, useState } from "react";
import { useProduct } from "@/features/product/hooks/useProduct.js";
import { productService } from '@/features/product/services/productService.js';
import { CRUD } from "@utils/enums.js";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { ProductDTO } from "@/utils/schemas";

export const useProductCrud = ({autofetch=false}={}) => {

    const { setId, id, setCurrentItem, currentProduct, loading: loadingItem, 
    error: errorItem , ...props } = useProduct({autofetch: autofetch});

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode]  = useState();
    
    const { ... formCrud } = useCrudForm(currentProduct, ProductDTO, "create");

    const { handleCreate, handleUpdate, handleDelete,  handleStatus, 
        loading, setLoading, error, success, setError, setSuccess,
    } = useCrudActions({ service: productService });




    return ({
        ...props,
        // Form
        ...formCrud,

        // Actions
        handleCreate,
        handleUpdate,
        handleDelete,
        handleStatus,
        loading: loadingItem || loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        errorItem,

        // Product
        currentProduct,
        setCurrentItem,
        currentItem: currentProduct,
        dataItem,
        setDataItem,
        setId, id,
        crudMode, 
        setCrudMode, 
        showModal, 
        setShowModal,


    })
}
