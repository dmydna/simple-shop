import React, {createContext, useContext, useEffect, useState} from "react";
import { CRUD, mode } from "../../../utils/crud.js";
import { visibility } from "../../../utils/posts.js";
import { listingService } from '../services/listingService.js';
import { useListingContext } from "./ListingContext.jsx";
import {usePanel} from "../../../contexts/usePanel.js";
import {useFetch} from "../../../contexts/useFetch.jsx";
import {useForm} from "../../../contexts/useForm.js";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";
import {useListing} from "../hooks/useListing.js";


export const ListingCrudContext = createContext(null)

export function ListingCrudProvider({ children }){

    const { fetchData } = useListingContext();
    const { setListingHash, listingHash, currentListing} = useListing();
    const { loading, setLoading, content ,setContent, error,setError} = useFetch()
    const [ showCrud, setShowCrud ] = useState(false);
    const [ crudMode, setCrudMode ] = useState("create");
    const [ dataItem, setDataItem ] = useState({ });
    const [ editableFields, setEditableFields ] = useState({});
    const [ selectedFile, setSelectedFile ] = useState([]); // Para subir Imagenes.
    const [ isSelectedProduct, setIsSelectedProduct ] = useState(false)
    const { expandx, setExpandx } = usePanel()
    const { formData, onChange } = useForm();
    const [ hashItem, setHashItem] = useState({});


    // Primer step segun modo



    // On-change Current Item
    useEffect(()=>{
        setDataItem(formData)
    },[formData])


    //Esta función envía un nuevo item a la API usando POST, luego actualiza la lista de items y cierra el modal si todo sale bien. 
    // Si ocurre un error, muestra una alerta y lo registra en la consola.
    const handleCreate = async () => {
        setLoading(true)
        setError(null)
        const productData = dataItem;
        try {
            await listingService.createWithImage(productData, selectedFile)
            await fetchData();
            handleCloseModal();
        } catch (error) {
            setError("Error creando item")
            console.error(error);
            throw error;
        } finally {
            setLoading(false)
        }
    };


    const handleUploadImage = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert("Por favor selecciona un archivo");
        try {
            // TODO: Actualizar backend para actualizar imagenes.
            // await listingService.update(currentItem.id, selectedFile);
            alert("Imagen subida con éxito");
        } catch (error) {
            alert("Error al subir: " + error.message);
        }
    };


    const handleUpdate = async () => {
        const id = dataItem.id;
        setLoading(true)
        setError(null)

        const updatedData = {
            ...dataItem,
            productName: (dataItem.productName),
            price: parseFloat(dataItem.price),
            stock: parseInt(dataItem.stock, 10),
            discountPercentage: parseFloat(dataItem.discountPercentage),
            weight: parseInt(dataItem.weight, 10),
        };

        try {
            await listingService.update(id, updatedData, selectedFile);
            await fetchData();
            handleCloseModal();
        } catch (err) {
            alert("Error actualizando item");
            console.error(err);
            setError("Error actualizando item");
            throw error;
        } finally {
            setLoading(false)
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este item?")) {
            try {
                await listingService.delete(id)
                await fetchData();
            } catch (error) {
                alert("Error eliminando item");
                console.error(error);
            }
        }
    };


    const handleCloseModal = () => {
        setShowCrud(false);
        setEditableFields({})
        setExpandx(prev => !prev);
        setIsSelectedProduct(false)
    };

    const handleReset = () => {
        setShowCrud(false);
        setEditableFields({});
        setSelectedFile(null);
        setCrudMode(CRUD.CREATE);
        setDataItem({});
    }


    const visibilityToggle = () => {
        return dataItem.visibility == visibility.HIDDEN ?
            visibility.PUBLIC : visibility.HIDDEN
    }

    const handleVisibility = async (item) => {
        setDataItem(item)
        const str_visibility = visibilityToggle();
        if (window.confirm("¿Seguro que quieres ocultar/mostrar este item?")) {
            try {
                await listingService.updateVisibility(item.id, str_visibility )
                await fetchData();
                window.confirm("operacion exitosa!")
            } catch (error) {
                alert("Error ocultando item");
                console.error(error);
            }
        }
    }

    const handleEnableEdit = (fieldName) => {
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: true // Se activa y no se desactiva con el mismo botón
        }));
        console.log(editableFields)
    };

    const isDisabledField = (name, isLockable = false) => {
        if (crudMode === CRUD.CREATE && isLockable) {return true;}
        if (crudMode === CRUD.UPDATE && !editableFields[name]){return true;}
        return false;
    };




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
                setCrudMode,
                setShowCrud: setShowCrud,
                handleCloseModal,
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
                expandx, setExpandx,
                isSelectedProduct, setIsSelectedProduct,
                handleUploadImage
            }}>
            {children}
        </ListingCrudContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListingCrud = () => useContext(ListingCrudContext);

