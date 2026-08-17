import { useState } from "react";
import { productService } from '@/features/product/services/productService.js';
import { CRUD } from "@utils/enums.js";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { ProductDTO } from "@/utils/schemas";
import { useFetchElem } from "@/hooks/useFetchElem";
import { useService } from "@/hooks/useService";

export const useProductCrud = () => {

    // General states
    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode]  = useState();
    const [scheme, setScheme] = useState(ProductDTO)
    
    // config hooks
    const configService = {service: productService}
    const configElem = {fetchMethod: productService.getById}

    const { id, setId, loading, error: errorItem, currentItem,  setCurrentItem, refreshElem } = 
    useFetchElem({...configElem})
    const { ... formCrud } = useCrudForm(currentItem, scheme, "create");
    const { ...servicesMethods } = useService({ ...configService});

    return ({
        ...servicesMethods,
        // Form
        ...formCrud,
        scheme,
        setScheme,

        // Fetch state
        loading,
        errorItem,

        // Product
        id,setId,
        setCurrentItem,
        currentProduct: currentItem,
        currentItem,
        refreshElem,
        dataItem,
        setDataItem,

        // Mode
        crudMode, 
        setCrudMode,
        showModal, 
        setShowModal,
    })
}
