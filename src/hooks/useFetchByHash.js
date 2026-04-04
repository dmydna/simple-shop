import { useEffect, useState } from "react";
import { useFetch } from "./useFetch.js";

export const useFetchByHash = ({ service }) => {
    const { loading, setLoading, error, setError } = useFetch();
    const [currentItem, setCurrentItem] = useState({});
    const [itemHash, setItemHash] = useState(null);

    const fetchDataByHash = async (hash) => {
        setLoading(true);
        setError(null);

        try {
            const data = await service.getByHash(hash);
            setCurrentItem(data.listing);
        } catch (err) {
            console.error("Error de carga de API", err);
            setError(err.message || "Error al cargar el elemento");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (itemHash) {
            fetchDataByHash(itemHash);
        }
    }, [itemHash]);

    return {
        loading, setLoading,
        error, setError,
        currentItem, setCurrentItem,
        itemHash, setItemHash,
        fetchDataByHash
    };
};