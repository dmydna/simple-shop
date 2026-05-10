import { useEffect, useState, useCallback } from "react";
import { useFetch } from "./useFetch";

export const useFetchElem = ({ fetchMethod }) => {
    const { loading, setLoading, error, setError } = useFetch();
    const [currentItem, setCurrentItem] = useState({});
    const [id, setId] = useState(null);

    const fetchElem = async (ID) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchMethod(ID);
            setCurrentItem(data);
            console.log("desde fetchElem data",data)
        } catch (err) {
            console.error("Error de carga de API", err);
            setError(err.message || "Error al cargar el elemento");
        } finally {
            setLoading(false);
        }
    };

    const refreshElem = useCallback(() => {
          fetchElem(id)
    },[id])

    useEffect(() => {
        if (id) {
            fetchElem(id);
        }
    }, [id]);

    return {
        loading, 
        setLoading,
        error, setError,
        currentItem, 
        setCurrentItem,
        id, setId,
        fetchElem,
        refreshElem
    };
};
