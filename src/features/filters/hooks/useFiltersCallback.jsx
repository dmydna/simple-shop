import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFiltersCallback = (callback) => {

    const [searchParams, setSearchParams] = useSearchParams();

    // Leemos la URL inicialmente para llenar los estados
    const initialFilters = Object.fromEntries(searchParams);

    const [filters, setFilters] = useState(initialFilters);
    const [filterDraft, setFilterDraft] = useState(initialFilters);

    // Cada vez que los filtros "oficiales" cambian, actualizamos URL y ejecutamos el callback
    useEffect(() => {
        setSearchParams(filters);
        // Ejecutamos la función externa (sea un fetchData, un setState, etc.)
        if (callback) {
            callback(filters);
        }
    }, [filters, setSearchParams, callback]);

    const applyFilters = () => {
        // Limpieza de valores vacíos para mantener la URL y el estado limpios
        const cleanFilters = Object.fromEntries(
            Object.entries(filterDraft).filter(([, v]) => v !== "" && v !== null && v !== undefined)
        );
        setFilters(cleanFilters);
    };

    const reset = () => {
        setFilters({});
        setFilterDraft({});
    };

    const removeFilter = (key) => {
        const newFilters = { ...filters };
        delete newFilters[key];
        setFilters(newFilters);
        setFilterDraft(newFilters);
    };

    return {
        filters,
        filterDraft,
        setFilterDraft,
        isActiveFilter: Object.keys(filters).length > 0,
        applyFilters,
        reset,
        removeFilter
    };
};