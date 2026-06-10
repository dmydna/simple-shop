import { statsService } from '@features/stats/services/statsService.js';
import { useFetchTrigger } from "@/hooks/useFetchTrigger";


// TODO: agregar metodos faltantes a useStats. 
export const useStats = () => {
    // 1. Llamada para obtener el TOP (Listas)
    // Desestructuramos con nombres únicos para evitar colisiones
    const { 
        data: topData, 
        loading: topLoading, 
        error: topError, 
        success: topSuccess,
        refreshData: refreshTop,
        setTrigger: setTopTrigger
    } = useFetchTrigger({ fetchMethod: statsService.getTop });

    // 2. Llamada para obtener las ESTADÍSTICAS (Métricas)
    const { 
        data: statsData, 
        loading: statsLoading, 
        error: statsError, 
        success: statsSuccess,
        refreshData: refreshStats,
        setTrigger: setStatsTrigger
    } = useFetchTrigger({ fetchMethod: statsService.getStats });

    // 3. Retornamos los datos con los nombres que tu componente espera (con prefijos)
    return {
        // Datos del Top
        topData,
        topLoading,
        topError,
        topSuccess,
        refreshTop,
        setTopTrigger,
        
        // Datos de Estadísticas
        statsData,
        statsLoading,
        statsError,
        statsSuccess,
        refreshStats,
        setStatsTrigger,
        
        // Opcional: Si necesitas acceso directo a los setters originales
        // ...props (si tu hook devolvía algo extra)
    };
};