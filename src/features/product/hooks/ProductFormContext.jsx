import React, { createContext, useContext, useState } from "react";
import { CRUD, mode } from "../../../utils/crud.js";
import { visibility } from "../../../utils/posts.js";
import { useProducts } from "./ProductContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {productService} from "../service/productService.js";

export const ProductFormContext = createContext(null)

export function ProductFormProvider({ children }){

    const { fetchData } = useProducts();
    const [ showModal, setShowModal ] = useState(false);
    const [ modalMode, setModalMode ] = useState("create");
    const [ productMode, setProductMode] = useState(null)
    const [ currentItem, setCurrentItem ] = useState({ title: "", description: "", precio:0.0, stock:0 });
    const [ editableFields, setEditableFields ] = useState({});

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
            await productService
                .create(productData)
            await fetchData();
            handleCloseModal();
        } catch (error) {
            alert("Error creando item");
            console.error(error);
        }
    };


    const handleUpdate = async () => {
        const id = currentItem.id;
        const updatedData = {
            ...currentItem,
            name: (currentItem.name),
            price: parseFloat(currentItem.price),
            stock: parseInt(currentItem.stock, 10),
            discountPercentage: parseFloat(currentItem.discountPercentage),
            weight: parseInt(currentItem.weight, 10),
        };

        try {
            await productService
                .update(id, updatedData);
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
                await productService
                    .delete(id)
                await fetchData();
            } catch (error) {
                alert("Error eliminando item");
                console.error(error);
            }
        }
    };

    const openCreateModal = () => {
        setModalMode(CRUD.CREATE);
        setCurrentItem({ title: "", description: "" });
        setShowModal(true);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const openEditModal = (item) => {
        setModalMode(CRUD.UPDATE);
        setCurrentItem(item);
        setShowModal(true);
        navigate('/panel/welcome')
    };

    const openReadModal = async (item) => {
        setModalMode(CRUD.READ);
        setShowModal(true);
        setCurrentItem(item);
    };

    const openUpdateModal = async (item) => {
        setModalMode(CRUD.UPDATE);
        setShowModal(true);
        setCurrentItem(item);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditableFields({})
    };

    const handleReset = () => {
        setShowModal(false);
        setEditableFields({});
        setProductMode(mode.INIT);
        setModalMode(CRUD.CREATE);
        setCurrentItem({});
    }


    const visibilityToggle = () => {
        return currentItem
            .visibility == visibility.HIDDEN ?
            visibility.PUBLIC : visibility.HIDDEN
    }



    const handleEnableEdit = (fieldName) => {
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: true // Se activa y no se desactiva con el mismo botón
        }));
        console.log(editableFields)
    };

    const isDisabledField = (name, isLockable = false) => {
        if (modalMode === CRUD.CREATE && productMode == 'select' && isLockable ) {
            return true;
        }
        if (modalMode === CRUD.UPDATE && !editableFields[name]){
            return true;
        }
        return false;
    };



    return (

        <ProductFormContext.Provider
            value={{
                // CRUD
                handleUpdate,
                handleCreate,
                handleDelete,
                // MODAL
                modalMode,
                showModal,
                openReadModal,
                openEditModal,
                openUpdateModal,
                openCreateModal,
                setModalMode,
                setShowModal,
                handleCloseModal,
                // FORM
                currentItem,
                handleChange,
                handleEnableEdit,
                editableFields,
                setEditableFields,
                setCurrentItem,
                isDisabledField,
                setProductMode,
                productMode,
            }}>
            {children}
        </ProductFormContext.Provider>

    )
}

export const useProductsForm = () => useContext(ProductFormContext);

