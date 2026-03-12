// src/features/filters/context/FilterContext.jsx
import {createContext, useContext} from "react";
import {useFilter} from "../hooks/useFilter.jsx";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    // Reutilizamos la lógica aquí para el estado global
    const filterLogic = useFilter();

    return (
        <FilterContext.Provider value={filterLogic}>
            {children}
        </FilterContext.Provider>
    );
};

export const useGlobalFilters = () => useContext(FilterContext);