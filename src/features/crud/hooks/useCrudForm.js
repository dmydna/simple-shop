import { useState } from "react";
import { useForm } from '@hooks/useForm.js';

export const useCrudForm = (initialData) => {
    
    const [selectedFile, setSelectedFile] = useState()
    const [editableFields, setEditableFields] = useState({});
    const {onChange, formData, setFormData} = useForm(initialData)

    const [enableEditableField, setEnableEditableField] = useState(true)
    

    const handleEnableEdit = (field) => {
        setEditableFields(prev => ({ ...prev, [field]: true }));
    };

    const isDisabledField = (field) => {
        return !editableFields[field] && enableEditableField;
    };

    return {
        editableFields,
        setEditableFields,
        handleEnableEdit,
        isDisabledField,
        selectedFile,
        setSelectedFile,
        formData,
        onChange,
        setFormData,
        setEnableEditableField
    };
};