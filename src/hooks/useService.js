import { useMemo } from "react";
import { useFetch } from "./useFetch.js";
import nprogress from "nprogress";


export const useService = ({service, onSuccess, onError, onRefresh}) => {


    const {loading, setLoading, content ,
        setContent, error, setError, success, setSuccess} = useFetch()

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
        nprogress.start();
        setLoading(true)
        setError(null)
        setContent(null)
        try {
            const result = await service[action](...args)
            onSuccess?.(result);
            onRefresh?.();
            setSuccess(true)
            setContent(result);
            console.log("useService",result)
            return result;
        } catch (err) {
            setError(err);
            onError?.(err);
            setContent(null)
            throw err;
        } finally {
            setLoading(false)
            nprogress.done();
        }
    };

    return {
        ...serviceCrud, execute, loading, setLoading, content ,
        setContent, error, setError, success, setSuccess
    }
}
