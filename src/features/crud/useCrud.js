import {useMemo, useState} from 'react';
import {CRUD} from "../../utils/crud.js";
import {useForm} from "../../contexts/useForm.js";

export const useCrud = (onUpdateElem) => {
    
    const [showCrud, setShowCrud] = useState(false);
    const [crudMode, setCrudMode] = useState(CRUD.CREATE);
    const { formData, setFormData, onChange,
        selectedFile, setSelectedFile } = useForm({});


    // Gestores de Modo
    const openCreate = (initialData = {}) => {
        setCrudMode(CRUD.CREATE);
        setFormData(initialData);
        setShowCrud(true);
    };

    const openEdit = (item) => {
        setCrudMode(CRUD.UPDATE);
        setFormData(item);
        setShowCrud(true);
        onUpdateElem(item?.hash);
    };

    const close = () => {
         setShowCrud(false)
         setFormData({});
         setSelectedFile(null);
    };

    
    return {
        crudMode, setCrudMode,
        openCreate, openEdit, close,
        selectedFile, setSelectedFile,
        showCrud, setShowCrud,
        dataItem: formData, setDataItem: setFormData,
        onChange
    };
};
