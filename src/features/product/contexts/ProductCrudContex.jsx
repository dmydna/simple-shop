import { createContext, useCallback, useContext, useEffect } from "react";
import { useCrudActions } from "../../crud/useCrudActions.js";
import { useCrudForm } from "../../crud/useCrudForm.js";
import { useCrudModal } from "../../crud/useCrudModal.js";
import { useProduct } from "../hooks/useProduct.js";
import { productService } from "../service/productService.js";
import { useProductContext } from "./ProductContext.jsx";

export const ProductCrudContext = createContext(null)

export function ProductCrudProvider({ children }){

    const { setProductId, productId, currentProduct } = useProduct();
    const { fetchData, currentPage, filters } = useProductContext();

    const refreshList = useCallback(() => {
        fetchData(currentPage, filters);
    }, [currentPage, filters, fetchData]);

    const { showCrud, setShowCrud, crudMode, setCrudMode, 
        dataItem, setDataItem, openCreate, openEdit, close }
        = useCrudModal({ onUpdateElem: setProductId });

    const { editableFields, setEditableFields, handleEnableEdit, 
        isDisabledField, selectedFile, setSelectedFile, onChange, formData  }
        = useCrudForm({ dataItem });

    const { handleCreate, handleUpdate, handleDelete, 
        handleVisibility, loading: loadingCrud, error: errorCrud }
        = useCrudActions({ service: productService, onRefresh: refreshList });


    useEffect(() => {
        if (!showCrud) setEditableFields({});
         setProductId(dataItem?.id)
    }, [showCrud, dataItem]);

    

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
                formData,

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

