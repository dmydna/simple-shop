import {useMemo, useState} from "react";
import {useFetch} from "../../contexts/useFetch.jsx";
import {useListingContext} from "../listing/contexts/ListingContext.jsx";

export const useService = ({service, hook}) => {


    const { fetchData, currentPage } = hook;


    const {loading, setLoading, content ,
        setContent, error, setError} = useFetch()

    const [succeeded, setSucceeded] = useState()
    const [failed, setFailed]  = useState();

    const serviceCrud = useMemo(() => {
        const wrapper = {};
        // Iteramos sobre las propiedades del objeto service
        Object.keys(service).forEach((key) => {
            // Solo envolvemos si es una función
            if (typeof service[key] === 'function') {
                wrapper[key] = (...args) => execute(key, ...args);
            }
        });
        return wrapper;
    }, [service]);


    // Acciones Genéricas
    const execute = async (action, ...args) => {
        setLoading(true)
        setError(null)
        try {
            const result = await service[action](...args)
            if (fetchData) await fetchData(currentPage, {});
            if (succeeded) succeeded();
            return result;
        } catch (error) {
            setError(error)
            if(failed) failed();
            console.error("Error en operación CRUD", error);
        } finally {
            setLoading(false)
        }
    };

    return {
        ...serviceCrud, execute, loading, setLoading, content ,
        setContent, error, setError
    }
}