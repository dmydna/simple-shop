import { useEffect, useState } from "react";
import { useForm } from '../../hooks/useForm.js'

export const useCrudForm = ({dataItem}) => {
    
    const [selectedFile, setSelectedFile] = useState()
    const [editableFields, setEditableFields] = useState({});
    const {onChange, formData, setFormData} = useForm(dataItem)


    useEffect(()=>{
        setFormData(dataItem)
    },[dataItem])

    const handleEnableEdit = (field) => {
        setEditableFields(prev => ({ ...prev, [field]: true }));
    };

    const isDisabledField = (field) => {
        return !editableFields[field];
    };

    return {
        editableFields,
        setEditableFields,
        handleEnableEdit,
        isDisabledField,
        selectedFile,
        setSelectedFile,
        formData,
        onChange
    };
};