// FilterContext.js
import { createContext, useContext } from 'react';

// 1. Creamos el almacén de datos (Contexto)
const FilterBarContext = createContext(null);

// 2. Definimos el Hook personalizado (useFilter)
// Esto es solo un acceso directo para no escribir useContext(FilterContext) siempre
// eslint-disable-next-line react-refresh/only-export-components
export const useFilterBarContext = () =>  useContext(FilterBarContext);


export const FilterBarProvider = ({ children, ...props }) => {

    return (
        <FilterBarContext.Provider 
            value={{...props}}>
            {children}
        </FilterBarContext.Provider>
    );
};