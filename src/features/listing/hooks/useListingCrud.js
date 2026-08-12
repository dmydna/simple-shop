import {  useState } from "react";
import { CRUD } from "@utils/enums.js";
import { useCrudForm } from "@/features/crud/hooks/useCrudForm.js";
import { listingService } from '../services/listingService.js';
import { ListingDTO } from "@/utils/schemas.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";
import { useService } from "@/hooks/useService.js";





// Nota1: 
// Este hook hace referencia a la instancia de un elemento.
// No se manejan listas.
// Nota2:
// Este hook deberia llamarse useListingAction para hacer referencia
// al componente listingActions

export const useListingCrud = () => {

    const [showModal, setShowModal] = useState(false)
    const [dataItem, setDataItem] = useState({});
    const [crudMode, setCrudMode] = useState()
    const [scheme, setScheme] = useState(ListingDTO)

    // config hooks
    const configService = {service: listingService}
    const configElem = {fetchMethod: listingService.getByHash}

    const { id, setId, loading, error: errorItem, currentItem,  setCurrentItem, refreshElem } = useFetchElem({...configElem})

    const { ... formCrud } = useCrudForm(currentItem, scheme, "create" ,{});
    const { ...servicesMethods} = useService({ ...configService});


    return ({
        ...servicesMethods,
        // Form
        ...formCrud,
        scheme,
        setScheme,

        // Fetch state
        loading,
        errorItem,

        // Listing
        id,setId,
        setCurrentItem,
        currentListing: currentItem,
        currentItem,
        refreshElem,
        dataItem,
        setDataItem,

        // Mode
        crudMode, 
        setCrudMode,
        showModal, 
        setShowModal,
    
    })
}
