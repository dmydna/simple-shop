import { CRUD } from "@/utils/crud.js";
import { useEffect, useState } from "react";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { listingService } from '../services/listingService.js';
import { useListing } from "./useListing";

export const useListingCrud = () => {

    const { setCurrentItem, currentListing, setId, id, loading: loadingItem, error: errorItem, refreshElem } = useListing();

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode] = useState()
    
    const { editableFields, setEditableFields, handleEnableEdit, setEnableEditableField,
        isDisabledField, selectedFile, setSelectedFile, onChange, formData, setFormData }
        = useCrudForm();

    const { handleCreate, handleUpdate, handleDelete, handleStatus, 
        loading, setLoading, error, setError, success, setSuccess }
        = useCrudActions({ service: listingService });

    useEffect(()=>{
        setFormData(currentListing)
        setEnableEditableField(true)
        if (
            crudMode == CRUD.DRAFT || 
            crudMode == CRUD.CREATE
        ) {
            setEnableEditableField(false)
            if(Object.keys(currentListing).length != 0){
                setFormData(prev => ({ ...prev }))
            }
            setFormData({...currentListing})
        };
      if(crudMode == CRUD.COPY){
         setEnableEditableField(false)
       }


    },[crudMode,currentListing])

    return ({

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
        setCurrentItem,
        setEnableEditableField,

        // Actions
        handleCreate,
        handleUpdate,
        handleDelete,
        handleStatus,

        loading: loading || loadingItem,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        errorItem,

        // Listing
        currentListing,
        currentItem: currentListing,
        dataItem,
        setDataItem,

        crudMode, 
        setCrudMode,
        showModal, 
        setShowModal,
        setId, 
        id,
        refreshElem
    })
}
