import React, { createContext, useContext, useState } from "react";
import { CRUD, mode } from "../../../utils/crud.js";
import { visibility } from "../../../utils/posts.js";
import { listingService } from '../services/listingService.js';
import { useListings } from "./ListingContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {useForm} from "../contexts/useForm.jsx";

export const ListingFormContext = createContext(null)

export function ListingFormProvider({ children }){

    const { fetchData } = useListings(); 
    const [ showModal, setShowModal ] = useState(false);
    const [ modalMode, setModalMode ] = useState("create");
    const [ productMode, setProductMode] = useState(null) 
    const [ currentItem, setCurrentItem ] = useState({ title: "", description: "", precio:0.0, stock:0 });
    const [ editableFields, setEditableFields ] = useState({});
    const [ selectedFile, setSelectedFile ] = useState([]); // Para subir Imagenes.


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
        await listingService.createWithImage(productData, selectedFile)
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
        productName: (currentItem.productName),
        price: parseFloat(currentItem.price),
        stock: parseInt(currentItem.stock, 10),
        discountPercentage: parseFloat(currentItem.discountPercentage),
        weight: parseInt(currentItem.weight, 10),
      };
  
      try {
          await listingService.update(id, updatedData);
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
          await listingService.delete(id)
          await fetchData();
        } catch (error) {
          alert("Error eliminando item");
          console.error(error);
        }
      }
    };




    const handleCloseModal = () => {
      setShowModal(false);
      setEditableFields({})
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
      if (modalMode === CRUD.CREATE && productMode == 'select' && isLockable ) {
        return true;
      }
      if (modalMode === CRUD.UPDATE && !editableFields[name]){ 
        return true; 
      }
      return false;
    };



    return (
        
        <ListingFormContext.Provider 
        value={{ 
            // CRUD
            handleUpdate,
            handleCreate,
            handleDelete,
            // MODAL
            modalMode, 
            showModal,
            setModalMode,
            setShowModal,
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
          }}>
            {children}
        </ListingFormContext.Provider>

    )
}

export const useListingsForm = () => useContext(ListingFormContext);

