import { useEffect, useState } from "react";
import { useProduct } from "@/features/product/hooks/useProduct.js";
import { productService } from '@/features/product/services/productService.js';
import { CRUD } from "@utils/enums.js";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";

export const useProductCrud = ({autofetch=false}={}) => {

    const { setId, id, setCurrentItem, currentProduct, loading: loadingItem, 
    error: errorItem , ...props } = useProduct({autofetch: autofetch});

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode]  = useState();
    
    const { editableFields, setEditableFields, handleEnableEdit, setEnableEditableField,
        isDisabledField, selectedFile, setSelectedFile, onChange, formData, setFormData }
        = useCrudForm();

    const { handleCreate, handleUpdate, handleDelete,  handleStatus, 
        loading, setLoading, error, success, setError, setSuccess,
    } = useCrudActions({ service: productService });

    useEffect(()=>{
        setFormData(currentProduct)
        setEnableEditableField(true)
        if (
            crudMode == CRUD.DRAFT || 
            crudMode == CRUD.CREATE
        ) {
            setEnableEditableField(false)
            if(Object.keys(currentProduct).length != 0){
                setFormData(prev => ({ ...prev }))
            }
            setFormData({...currentProduct})
        };
      if(crudMode == CRUD.COPY){
         setEnableEditableField(false)
       }


    },[crudMode,currentProduct])


    return ({
        ...props,
        // Form
        editableFields,
        setEditableFields,
        handleEnableEdit,
        isDisabledField,
        selectedFile,
        setSelectedFile,
        onChange,
        handleChange: onChange,
        formData,
        setFormData,
        setEnableEditableField,

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
