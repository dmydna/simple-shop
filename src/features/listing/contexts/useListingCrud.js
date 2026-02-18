import {useCrud} from "../../crud/useCrud.js";
import {useListings} from "../hooks/ListingContext.jsx";
import {listingService} from "../services/listingService.js";
import {useState} from "react";

export const useListingCrud = () => {
    const { fetchData } = useListings();
    // Instanciamos el genérico
    const crud = useCrud(listingService, fetchData);

    // Estado para campos editables (muy específico de tu UI)
    const [editableFields, setEditableFields] = useState({});

    const handleSave = async () => {
        if (crud.mode === "CREATE") {
            await crud.execute(
                listingService.createWithImage,
                crud.currentItem,
                crud.selectedFile
            );
        }

        if(crud.mode === "DELETE") {
            await crud.execute(
                listingService.delete,
                crud.currentItem.id
            );
        }

        if (crud.mode === "UPDATE") {
            // Aquí centralizamos la limpieza de datos (Data Transformation)
            const payload = {
                ...crud.currentItem,
                price: parseFloat(crud.currentItem.price),
                stock: parseInt(crud.currentItem.stock, 10),
                weight: parseInt(crud.currentItem.weight, 10),
            };
            await crud.execute(listingService.update, crud.currentItem.id, payload);
        }

    };

    const toggleVisibility = async (item) => {
        const nextStatus = item.visibility === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE';
        if (window.confirm(`¿Cambiar visibilidad a ${nextStatus}?`)) {
            await crud.execute(listingService.updateVisibility, item.id, nextStatus);
        }
    };

    return {
        ...crud, // Exponemos lock, mode, currentItem, etc.
        handleSave,
        toggleVisibility,
        editableFields,
        setEditableFields,
        handleEnableEdit:
            (field) => setEditableFields(prev => ({ ...prev, [field]: true }))
    };
}

export default useListingCrud;