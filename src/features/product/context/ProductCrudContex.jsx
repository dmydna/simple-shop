import React, { createContext, useContext, useState } from "react";
import { CRUD, mode } from "../../../utils/crud.js";
import { visibility } from "../../../utils/posts.js";
import {productService} from "../service/productService.js";
import {useProduct} from "../hooks/useProduct.js";
import {usePanel} from "../../../contexts/usePanel.js";
import {useStepNavigation} from "../../listing/hooks/useStepNavigation.js";
import {useProductContext} from "./ProductContext.jsx";

export const ProductCrudContext = createContext(null)

export function ProductCrudProvider({ children }){

    const { fetchData } = useProductContext();
    const [ showCrud, setShowCrud ] = useState(false);
    const [ crudMode, setCrudMode ] = useState("create");
    const [ productMode, setProductMode] = useState(null)
    const [ currentItem, setCurrentItem ] = useState({ title: "", description: "", precio:0.0, stock:0 });
    const [ editableFields, setEditableFields ] = useState({});
    const [ selectedFile, setSelectedFile ] = useState([]); // Para subir Imagenes.
    const {currentStep, setCurrentStep} = useStepNavigation()

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setCurrentItem({ ...currentItem, [name]: val });
    };

    //Esta función envía un nuevo item a la API usando POST, luego actualiza la lista de items y cierra el modal si todo sale bien.
    // Si ocurre un error, muestra una alerta y lo registra en la consola.
    const handleCreate = async () => {
        const productData = currentItem;
        try {
            await productService.create(productData)
            await fetchData();
            handleCloseModal();
        } catch (error) {
            alert("Error creando item");
            console.error(error);
        }
    };


    const handleUpdate = async () => {
        const id = currentItem.id;
        // const updatedData = currentItem;

        const updatedData = {
            ...currentItem,
        };

        try {
            await productService.update(id, updatedData);
            await fetchData();
            handleCloseModal();
        } catch (err) {
            alert("Error actualizando item");
            console.error(err);
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este item?")) {
            try {
                await productService.delete(id)
                await fetchData();
            } catch (error) {
                alert("Error eliminando item");
                console.error(error);
            }
        }
    };


    const {expandx, setExpandx} = usePanel()


    const handleCloseModal = () => {
        setShowModal(false);
        setEditableFields({})
        setExpandx(prev => !prev);
    };

    const handleReset = () => {
        setShowModal(false);
        setEditableFields({});
        setSelectedFile(null);
        setProductMode(mode.INIT);
        setModalMode(CRUD.CREATE);
        setCurrentItem({});
    }


    const visibilityToggle = () => {
        return currentItem.visibility == visibility.HIDDEN ?
            visibility.PUBLIC : visibility.HIDDEN
    }

    const handleVisibility = async (item) => {
        setCurrentItem(item)
        const str_visibility = visibilityToggle();
        if (window.confirm("¿Seguro que quieres ocultar/mostrar este item?")) {
            try {
                await productService.updateVisibility(item.id, str_visibility )
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
        if (crudMode === CRUD.CREATE && productMode == 'select' && isLockable ) {
            return true;
        }
        if (crudMode === CRUD.UPDATE && !editableFields[name]){
            return true;
        }
        return false;
    };




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
                setCrudMode,
                setShowCrud,
                handleCloseModal,
                // FORM
                handleVisibility,
                currentItem,
                handleChange,
                handleEnableEdit,
                editableFields,
                setEditableFields,
                setCurrentItem,
                isDisabledField,
                setProductMode,
                productMode,
                selectedFile,
                setSelectedFile,
                // Panel
                expandx, setExpandx,
                setCurrentStep, currentStep
            }}>
            {children}
        </ProductCrudContext.Provider>

    )
}

export const useProductCrud = () => useContext(ProductCrudContext);

