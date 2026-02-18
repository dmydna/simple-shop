import { createContext, useContext } from 'react';


const PanelContext = createContext(null);

export const usePanelContext = () => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error("useFilter debe usarse dentro de un FilterProvider");
    }
    return context;
};

export const PanelProvider = ({ children, sidebar, currentStep }) => {
    const value = {
        onFilterDraft,
        array

    };



    return (
        <FilterBarContext.Provider value={value}>
            {children}
        </FilterBarContext.Provider>
    );
};