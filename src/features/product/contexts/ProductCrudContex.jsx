import React, {createContext, useContext, useEffect, useState} from "react";
import {productService} from "../service/productService.js";
import {useProductContext} from "./ProductContext.jsx";
import {useService} from "../../../contexts/useService.js";
import {useCrud} from "../../crud/useCrud.js";
import {useEditableForm} from "../../crud/useEditableForm.js";
import {useProduct} from "../hooks/useProduct.js";

export const ProductCrudContext = createContext(null)

export function ProductCrudProvider({ children }){

    const { setProductId, productId, currentProduct} = useProduct();
    const productHook = useProductContext();
    const { create, update, Delete }
        = useService({service: productService, hook: productHook })

    const { crudMode, setCrudMode,
        openCreate, openEdit, close,
        showCrud, setShowCrud,
        dataItem, setDataItem,
        onChange } = useCrud({onUpdateElem: productId})

    const { editableFields, setEditableFields,
        handleEnableEdit, isDisabledField } = useEditableForm( crudMode ) ;


    const handleCreate = async () => {
        const productData = dataItem;
        create(productData)
    }

    const handleUpdate = async () => {
        console.log('Estoy actualizando el item:', dataItem.id)
        const updatedData = {
            ...dataItem,
            name: (dataItem.productName),
            stock: parseInt(dataItem.stock, 10),
            weight: parseInt(dataItem.weight, 10),
        };
        update(dataItem.id, updatedData)
    }


    const handleDelete = async (id) => {
        const MSG_ALERT = "¿Seguro que quieres eliminar este item?"
        if (window.confirm(MSG_ALERT)) {
            Delete(id)
        }
    }


    useEffect(() => {
        if(!showCrud) setEditableFields({})
    }, [showCrud]);


    return (

        <ProductCrudContext.Provider
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
                dataItem,
                setDataItem,
                handleChange: onChange,
                handleEnableEdit,
                editableFields,
                setEditableFields,
                isDisabledField,

                currentProduct,
                setProductId,
                productId,
                itemHash: productId,
                setItemHash: setProductId,
                currentItem: currentProduct,
                // Panel
            }}>
            {children}
        </ProductCrudContext.Provider>

    )
}

export const useProductCrud = () => useContext(ProductCrudContext);

