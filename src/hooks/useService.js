import { useMemo } from "react";
import { useFetch } from "./useFetch.js";

export const useService = ({service, onSuccess, onError, onRefresh}) => {


    const {loading, setLoading, content ,
        setContent, error, setError} = useFetch()

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
            onSuccess?.(result);
            onRefresh?.();
            return result;
        } catch (err) {
            setError(err);
            onError?.(err);
            throw err;
        } finally {
            setLoading(false)
        }
    };

    return {
        ...serviceCrud, execute, loading, setLoading, content ,
        setContent, error, setError
    }
}