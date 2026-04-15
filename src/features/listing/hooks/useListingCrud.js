import { useEffect, useState } from "react";
import { useCrudActions } from "../../crud/useCrudActions.js";
import { useCrudForm } from "../../crud/useCrudForm.js";
import { listingService } from '../services/listingService.js';
import { useListing } from "./useListing";

export const useListingCrud = () => {
    const { setListingHash, listingHash, currentListing } = useListing();

    const [modalMode, setModalMode]  = useState();
    const { editableFields, setEditableFields, handleEnableEdit,
        isDisabledField, selectedFile, setSelectedFile, onChange, formData, setFormData }
        = useCrudForm({});

    const { handleCreate, handleUpdate, handleDelete,
        handleVisibility, loading: loadingCrud, error: errorCrud }
        = useCrudActions({ service: listingService });

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

        // Actions
        handleCreate,
        handleUpdate,
        handleDelete,
        handleVisibility,
        loadingCrud,
        errorCrud,

        // Listing
        currentListing,
        setListingHash,
        listingHash,
        itemHash: listingHash,
        setItemHash: setListingHash,
        currentItem: currentListing,

        modalMode, setModalMode, setFormData

    })
}