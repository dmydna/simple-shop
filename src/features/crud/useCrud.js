import { useState } from 'react';

export const useCrud = (service, fetchData) => {
    const [lock, setLock] = useState(false);
    const [mode, setMode] = useState("CREATE");
    const [currentItem, setCurrentItem] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    // Gestores de Modo
    const openCreate = (initialData = {}) => {
        setMode("CREATE");
        setCurrentItem(initialData);
        setLock(true);
    };

    const openEdit = (item) => {
        setMode("UPDATE");
        setCurrentItem(item);
        setLock(true);
    };

    const close = () => {
        setLock(false);
        setCurrentItem({});
        setSelectedFile(null);
    };

    // Acciones Genéricas
    const execute = async (action, ...args) => {
        try {
            await action(...args);
            if (fetchData) await fetchData();
            close();
        } catch (error) {
            console.error("Error en operación CRUD", error);
            alert("Ocurrió un error");
        }
    };

    return {
        lock, mode, currentItem, setCurrentItem,
        selectedFile, setSelectedFile,
        openCreate, openEdit, close, execute
    };
};