import { useEffect, useState } from "react";
import { useFetch } from "./useFetch.js";

export const useFetchById = ({ service, methodName = 'getById' }) => {
    const { loading, setLoading, error, setError, success, setSuccess } = useFetch();
    const [currentItem, setCurrentItem] = useState({});
    const [itemId, setItemId] = useState(null);

    const fetchDataById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const data = await service?.[methodName](id);
            setCurrentItem(data);
            setSuccess(true)
        } catch (err) {
            console.error("Error de carga de API", err);
            setError(err.message || "Error al cargar el elemento");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (itemId) {
            fetchDataById(itemId);
        }
    }, [itemId]);

    return {
        loading, setLoading,
        error, setError,
        currentItem, setCurrentItem,
        itemId, setItemId,
        fetchDataById, success, setSuccess
    };
};
