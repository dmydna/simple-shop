import { useState, useCallback } from 'react';
import nprogress from 'nprogress';

export const useAsync = (asyncFunction, options = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (...args) => {
        nprogress.start();
        setLoading(true);
        setError(null);

        try {
            const result = await asyncFunction(...args);
            setData(result);
            options.onSuccess?.(result);
            options.onRefresh?.();
            return result;
        } catch (err) {
            setError(err);
            options.onError?.(err);
            throw err;
        } finally {
            setLoading(false);
            nprogress.done();
        }
    }, [asyncFunction, options]);

    return { execute, loading, error, data };
};