import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import { visibility } from "../../../utils/posts.js";
import { listingService } from '../services/listingService.js';
import { useListingContext } from "./ListingContext.jsx";
import {useListing} from "../hooks/useListing.js";
import {useEditableForm} from "../../crud/useEditableForm.js";
import {useCrud} from "../../crud/useCrud.js";
import {useService} from "../../crud/useService.js";


export const ListingCrudContext = createContext(null)

export function ListingCrudProvider({ children }){

    const { setListingHash, listingHash, currentListing} = useListing();


    const listingHook = useListingContext();


    const { createWithImage, update, Delete,
        updateVisibility } = useService({service: listingService, hook: listingHook })


    const { crudMode, setCrudMode,
        openCreate, openEdit, close,
        selectedFile, setSelectedFile,
        showCrud, setShowCrud,
        dataItem, setDataItem,
        onChange } = useCrud({onUpdateElem: listingHash})


    const { editableFields, setEditableFields,
        handleEnableEdit, isDisabledField } = useEditableForm( crudMode ) ;

    const [ isSelectedProduct, setIsSelectedProduct ] = useState(false)


    const handleCreate = async () => {
        const productData = dataItem;
        createWithImage(productData, selectedFile)
    }

    const handleUpdate = async () => {
        console.log('Estoy actualizando el item:', dataItem.id)
        const updatedData = {
            ...dataItem,
            productName: (dataItem.productName),
            price: parseFloat(dataItem.price),
            stock: parseInt(dataItem.stock, 10),
            discountPercentage: parseFloat(dataItem.discountPercentage),
            weight: parseInt(dataItem.weight, 10),
        };
        update(dataItem.id, updatedData, selectedFile)
    }


    const handleDelete = async (id) => {
        const MSG_ALERT = "¿Seguro que quieres eliminar este item?"
        if (window.confirm(MSG_ALERT)) {
            Delete(id)
        }
    }


    const visibilityToggle = () => {
        return dataItem.visibility == visibility.HIDDEN ?
            visibility.PUBLIC : visibility.HIDDEN
    }

    const handleVisibility = async (item) => {
        const MSG_ALERT = "¿Seguro que quieres ocultar/mostrar este item?"
        setDataItem(item)
        const str_visibility = visibilityToggle();
        if (window.confirm(MSG_ALERT)) {
            updateVisibility(item.id, str_visibility )
        }
    }


    useEffect(() => {
        if(!showCrud) setEditableFields({})
    }, [showCrud]);


    return (

        <ListingCrudContext.Provider
            value={{
                // CRUD
                handleUpdate,
                handleCreate,
                handleDelete,
                // MODAL
                crudMode,
                showCrud,
                expandx: showCrud,
                setExpandx: setShowCrud,
                setCrudMode,
                setShowCrud: setShowCrud,
                handleCloseModal: close,
                openCreate,
                openEdit,
                // FORM
                handleVisibility,
                dataItem,
                setDataItem,
                handleChange: onChange,
                handleEnableEdit,
                editableFields,
                setEditableFields,
                isDisabledField,
                selectedFile,
                setSelectedFile,

                currentListing,
                setListingHash,
                listingHash,
                itemHash: listingHash,
                setItemHash: setListingHash,
                currentItem: currentListing,


                // Panel
                isSelectedProduct, setIsSelectedProduct,
            }}>
            {children}
        </ListingCrudContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListingCrud = () => useContext(ListingCrudContext);

