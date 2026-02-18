import {useListings} from "./ListingContext.jsx";
import {useState} from "react";
import {useForm} from "../contexts/useForm.jsx";
import {listingService} from "../services/listingService.js";
import {CRUD, mode} from "../../../utils/crud.js";
import {useNavigate} from "react-router-dom";
import {visibility} from "../../../utils/posts.js";


export const useCrudForm = () => {
    const { fetchData } = useListings();
    const [ lock, setLock ] = useState(false);
    const [ mode, setMode ] = useState("create");
    const [ productMode, setProductMode] = useState(null)
    const [ currentItem, setCurrentItem ] = useState({  });
    const [ editableFields, setEditableFields ] = useState({});
    const [ selectedFile, setSelectedFile ] = useState([]); // Para subir Imagenes.

    const {  formData, onChange, onResetForm, setFormData, onValue } = useForm()

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setCurrentItem({ ...currentItem, [name]: val });
    };

    //Esta función envía un nuevo item a la API usando POST, luego actualiza la lista de items y cierra el modal si todo sale bien.
    // Si ocurre un error, muestra una alerta y lo registra en la consola.

    const create = async () => {
        const productData = currentItem;
        try {
            await listingService.createWithImage(productData, selectedFile)
            await fetchData();
            handleExit();
        } catch (error) {
            alert("Error creando item");
            console.error(error);
        }
    };


    const update = async () => {
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
            handleExit();
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

    const handleCreate = () => {
        setMode(CRUD.CREATE);
        setCurrentItem({ title: "", description: "" });
        setLock(true);
    };

    const navigate = useNavigate();


    const handleRead = async (item) => {
        setMode(CRUD.READ);
        setLock(true);
        setCurrentItem(item);
    };

    const handleUpdate = async (item) => {
        setMode(CRUD.UPDATE);
        setLock(true);
        setCurrentItem(item);
    };

    const handleExit = () => {
        setLock(false);
        setEditableFields({})
    };

    const handleReset = () => {
        setLock(false);
        setEditableFields({});
        setSelectedFile(null);
        setProductMode(mode.INIT);
        setMode(CRUD.CREATE);
        setCurrentItem({});
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



    return ({
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
                setSelectedFile
            })
}