import { CRUD } from "@utils/enums.js";
import { useState } from 'react';

export const useCrudModal = () => {
    
    const [showCrud, setShowCrud] = useState(false);
    const [crudMode, setCrudMode] = useState(CRUD.CREATE);
    const [dataItem, setDataItem] = useState({});


    // Gestores de Modo
    const openCreate = (initialData = {}) => {
        setCrudMode(CRUD.CREATE);
        setDataItem(initialData);
        setShowCrud(true);

    };

    const openEdit = (item) => {
        setCrudMode(CRUD.UPDATE);
        setDataItem(item);
        setShowCrud(true);
        // console.log(item)
    };

    const close = () => {
         setShowCrud(false)
         setDataItem({});
//         setSelectedFile(null);
    };

    
    return {
        crudMode, setCrudMode,
        openCreate, openEdit, close,
        showCrud, setShowCrud,
        dataItem, setDataItem
    };
};
