import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCrudForm } from "../../crud/hooks/useCrudForm.js";
import { useCrudModal } from "../../crud/hooks/useCrudModal.js";
import { useCrudActions } from "@/features/crud/hooks/useCrudActions.js";
import { useListingContext } from "../contexts/ListingContext.jsx";
import { useListing } from "../hooks/useListing.js";
import { listingService } from '../services/listingService.js';


export const ListingCrudContext = createContext(null)

export function ListingCrudProvider({ children }) {
    const { setListingHash, listingHash, currentListing } = useListing();
    const { fetchData, currentPage, filters } = useListingContext();

    const refreshList = useCallback(() => {
        fetchData(currentPage, filters);
    }, [currentPage, filters, fetchData]);

    const { showCrud, setShowCrud, crudMode, setCrudMode, 
        dataItem, setDataItem, openCreate, openEdit, close }
        = useCrudModal();

    const { editableFields, setEditableFields, handleEnableEdit, 
        isDisabledField, selectedFile, setSelectedFile, onChange, formData }
        = useCrudForm({dataItem});

    const { handleCreate, handleUpdate, handleDelete, 
        handleVisibility, loading: loadingCrud, error: errorCrud }
        = useCrudActions({ service: listingService, onRefresh: refreshList });

    const [isSelectedProduct, setIsSelectedProduct] = useState(false);

    useEffect(() => {
        if (!showCrud) setEditableFields({});
        //mantener actualizado el elemento actual.
        setListingHash(dataItem?.hash)
    }, [showCrud, formData]);

    return (
        <ListingCrudContext.Provider
            value={{
                // Modal
                showCrud,
                setShowCrud,
                crudMode,
                setCrudMode,
                dataItem,
                setDataItem,
                openCreate,
                openEdit,
                close,

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
                expandx: showCrud, 
                setExpandx: setShowCrud,

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

                // Panel
                isSelectedProduct,
                setIsSelectedProduct,
            }}>
            {children}
        </ListingCrudContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListingCrudContext = () => useContext(ListingCrudContext);

