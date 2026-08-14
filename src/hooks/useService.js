import { useCallback, useMemo } from 'react';
import nprogress from 'nprogress';
import { useFetch } from './useFetch';

export const useService = ({ service, onSuccess, onError, onRefresh } = {}) => {
    const { 
        loading, setLoading, 
        content, setContent, 
        error, setError, 
        success, setSuccess 
    } = useFetch();

    const execute = useCallback(async (action, ...args) => {
        nprogress.start();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (typeof service?.[action] !== 'function') {
                throw new Error(`El método ${action} no existe en el servicio.`);
            }

            const result = await service[action](...args);
            
            setContent(result);
            setSuccess(true);
            onSuccess?.(result);
            onRefresh?.();
            
            return result;
        } catch (err) {
            setError(err);
            onError?.(err);
            setContent(null);
            throw err;
        } finally {
            setLoading(false);
            nprogress.done();
        }
    }, [service, onSuccess, onError, onRefresh, setLoading, setError, setContent, setSuccess]);

    const serviceCrud = useMemo(() => {
        if (!service) return {};
        
        const wrapper = {};
        Object.keys(service).forEach((key) => {
            if (typeof service[key] === 'function') {
                wrapper[key] = (...args) => execute(key, ...args);
            }
        });
        return wrapper;
    }, [service, execute]);

    return {
        ...serviceCrud,
        execute,
        loading,
        content,
        error,
        success,
        setError,
        setSuccess
    };
};