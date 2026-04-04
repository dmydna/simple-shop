import { useState } from 'react';
import {CRUD} from "../utils/crud.js";

export const useEditableForm = (mode) => {

    const [ editableFields, setEditableFields ] = useState({});

    const handleEnableEdit = (fieldName) => {
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    const isDisabledField = (name, isLockable = false) => {
        if (mode === CRUD.CREATE && isLockable) {return true;}
        if (mode === CRUD.UPDATE && !editableFields[name]){return true;}
        return false;
    };

    return {mode, handleEnableEdit, isDisabledField, editableFields, setEditableFields}
}