// FilterContext.js
import { createContext, useContext } from 'react';

// 1. Creamos el almacén de datos (Contexto)
const FilterBarContext = createContext(null);

// 2. Definimos el Hook personalizado (useFilter)
// Esto es solo un acceso directo para no escribir useContext(FilterContext) siempre
// eslint-disable-next-line react-refresh/only-export-components
export const useFilterBarContext = () => {
    const context = useContext(FilterBarContext);
    if (!context) {
        throw new Error("useFilter debe usarse dentro de un FilterProvider");
    }
    return context;
};

export const FilterBarProvider = ({ children, onFilterDraft, array }) => {
    const value = { onFilterDraft, array };
    return (
        <FilterBarContext.Provider value={value}>
            {children}
        </FilterBarContext.Provider>
    );
};