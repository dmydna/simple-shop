import {  useState } from "react";
import { CRUD } from "@utils/enums.js";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { listingService } from '../services/listingService.js';
import { useListing } from "./useListing";
import { ListingDTO } from "@/utils/schemas.js";




export const useListingCrud = ({autofetch=false}={}) => {

    const { setCurrentItem, currentListing, setId, id, loading: loadingItem, 
    error: errorItem, refreshElem, ...props} = useListing({autofetch});

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode] = useState()
    const [scheme, setScheme] = useState(ListingDTO)
    
    const { ... formCrud } = useCrudForm(currentListing, scheme, "create" ,{});

    const { handleCreate, handleUpdate, handleDelete, handleStatus, 
        loading, setLoading, error, setError, success, setSuccess, ...actions }
        = useCrudActions({ service: listingService });


    return ({
       ...props,

        // Form
        ...formCrud,

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
         setCurrentItem,
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
        refreshElem,


        scheme,
        setScheme,
        ...actions
    })
}
