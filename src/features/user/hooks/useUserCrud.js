import {  useState } from "react";
import { useCrudForm } from "@features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { useUser } from "../hooks/useUser.js";
import { userService } from "../service/userService.js";
import { ListingDTO } from "@/utils/schemas.js";


// Se usa profile porque incluye mas datos que user
export const useUserCrud = (fetchProfile=true) => {

    const { setId, id, currentItem, loading: loadingItem, error: errorItem, 
    refreshElem, setCurrentItem } 
    = useUser(userService[fetchProfile ? "getProfileById" : "getById"]);

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode] = useState();

    const { ... formCrud } = useCrudForm(currentItem);

    const { handleCreate, handleUpdate, handleDelete, handleStatus,
        loading, setLoading, error, success, setError, setSuccess, ...props
    } = useCrudActions({ service: userService });



    return ({
        ...props, // <-- userServices
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

        // User
        currentItem,
        dataItem,
        setCurrentItem,
        setDataItem,
        setId, id,
        crudMode,
        setCrudMode,
        showModal,
        setShowModal,
        refreshElem,
    })
}
