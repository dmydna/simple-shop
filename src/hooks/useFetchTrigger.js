import { useState, useEffect, useCallback } from 'react';


// Nota: Este hook generaliza fetchs a la Api (lista y elementos)
// Usar este hook para fetchs complejos o poco frecuentes que requieran uno o mas triggers. 
// - para obtener elementos simples con un trigger como id o hash usar ./FetchElem
// - para obtener lista de elementos paginados usar ./FetchData

export const useFetchTrigger = ({ fetchMethod, initialTriggers = {} }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    // Estado para guardar los disparadores actuales
    const [triggers, setTriggers] = useState(initialTriggers);

    // Función principal de carga
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Pasamos los triggers como argumentos a tu método de fetch
            // Ajusta esto según cómo tu fetchMethod reciba los datos
            const result = await fetchMethod(triggers); 
            setData(result);
        } catch (err) {
            console.error("Error de carga de API", err);
            setError(err.message || "Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    }, [fetchMethod, triggers]); // Dependencia crítica: 'triggers'

    // Efecto: Se ejecuta cuando CUALQUIERA de los valores en 'triggers' cambia
    useEffect(() => {
        // Solo cargamos si hay al menos un trigger definido y no es el estado inicial vacío
        const hasTriggers = Object.values(triggers).some(val => val !== null && val !== undefined);
        
        if (hasTriggers) {
            fetchData();
        }
    }, [triggers, fetchData]);

    // Función para actualizar los disparadores manualmente
    const setTrigger = useCallback((key, value) => {
        setTriggers(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    // Función para actualizar múltiples disparadores a la vez
    const setTriggersBatch = useCallback((newTriggers) => {
        setTriggers(prev => ({
            ...prev,
            ...newTriggers
        }));
    }, []);

    // Función manual para forzar una recarga (útil si los triggers no cambian pero quieres refrescar)
    const refreshData = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return {
        loading,
        error,
        data,
        setData,
        triggers,
        setTrigger,       // setTrigger('userId', 123)
        setTriggersBatch, // setTriggersBatch({ userId: 123, status: 'active' })
        refreshData,      // Forzar recarga
        fetchData         // La función interna (poco común usarla directamente)
    };
};