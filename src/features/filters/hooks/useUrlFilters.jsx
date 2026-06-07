import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export const useUrlFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterDraft, setFilterDraft] = useState({});
    const [isFiltering, setIsFiltering] = useState(false);

    // 1. Sincronizar URL -> Estado (Auto-detección de tipos)
    useEffect(() => {
        const paramsFromUrl = Object.fromEntries([...searchParams]);
        const formattedFilters = {};

        Object.keys(paramsFromUrl).forEach(key => {
            const rawValue = paramsFromUrl[key];
            const numericValue = Number(rawValue);

            // Lógica de auto-detección:
            if (!isNaN(numericValue) && rawValue.trim() !== '') {
                // Es un número válido
                formattedFilters[key] = numericValue;
            } else if (rawValue.includes(',')) {
                // Es una lista (array)
                formattedFilters[key] = rawValue.split(',');
            } else {
                // Es un string normal
                formattedFilters[key] = rawValue;
            }
        });

        setFilterDraft(formattedFilters);
    }, [searchParams]);

    // 2. Detectar si hay filtros activos
    useEffect(() => {
        setIsFiltering(Object.keys(filterDraft).length > 0);
    }, [filterDraft]);

    // 3. Aplicar Filtros (Estado -> URL)
    const applyFilters = (newFilters) => {
        const cleanParams = {};

        Object.keys(newFilters).forEach(key => {
            const value = newFilters[key];
            // Solo incluimos en la URL valores que existan
            if (value !== undefined && value !== null && value !== '') {
                cleanParams[key] = Array.isArray(value) ? value.join(',') : value;
            }
        });

        setSearchParams(cleanParams);
    };

    const removeFilters = () => {
        setSearchParams({});
        setFilterDraft({});
    };

    return {
        filterDraft,
        setFilterDraft,
        isFiltering,
        applyFilters,
        removeFilters
    };
};