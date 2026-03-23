import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useCrudModal } from "../../crud/useCrudModal.js";
import { useUser } from "../hooks/useUser.js";
import { useUserContext } from "./UserContext.jsx";
import { useCrudForm } from "../../crud/useCrudForm.js";
import { useCrudActions } from "../../crud/useCrudActions.js";
import { userService } from "../service/userService.js";


export const UserCrudContext = createContext(null)

export function UserCrudProvider({ children }) {
    const { setUserId, UserId, currentUser } = useUser();
    const { fetchData, currentPage, filters } = useUserContext();

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
        = useCrudActions({ service: userService, onRefresh: refreshList });

    useEffect(() => {
        if (!showCrud) setEditableFields({});
        //mantener actualizado el elemento actual.
        setUserId(dataItem?.id)
    }, [showCrud, formData]);

    return (
        <UserCrudContext.Provider
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

                // User
                currentUser,
                setUserId,
                UserId,
                itemId: UserId,
                setItemId: setUserId,
                currentItem: currentUser,

                // Panel
            }}>
            {children}
        </UserCrudContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserCrud = () => useContext(UserCrudContext);

