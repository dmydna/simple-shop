import { useEffect, useState } from "react";
import { useCrudForm } from "@features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { useUser } from "../hooks/useUser.js";
import { userService } from "../service/userService.js";

export const useUserCrud = () => {

    const { setId, id, currentUser, loading: loadingItem, error: errorItem, refreshElem } = useUser(userService.getProfileById);

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode] = useState();

    const { editableFields, setEditableFields, handleEnableEdit, setEnableEditableField,
        isDisabledField, selectedFile, setSelectedFile, onChange, formData, setFormData }
        = useCrudForm();

    const { handleCreate, handleUpdate, handleDelete, handleStatus,
        loading, setLoading, error, success, setError, setSuccess,
    } = useCrudActions({ service: userService });


    useEffect(()=>{
        setFormData(currentUser)
    },[currentUser])

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

        // User
        currentUser,
        currentItem: currentUser,
        dataItem,
        setDataItem,
        setId, id,
        crudMode,
        setCrudMode,
        showModal,
        setShowModal,
        refreshElem,
    })
}