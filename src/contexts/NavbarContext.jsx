// FilterContext.js
import { createContext, useContext } from 'react';

// 1. Creamos el almacén de datos (Contexto)
const NavbarContext = createContext(null);

// 2. Definimos el Hook personalizado (useFilter)
// Esto es solo un acceso directo para no escribir useContext(FilterContext) siempre
// eslint-disable-next-line react-refresh/only-export-components
export const useNavbarContext = () =>  useContext(NavbarContext);


export const NavbarProvider = ({ children, ...props }) => {

    return (
        <NavbarContext.Provider 
            value={{...props}}>
            {children}
        </NavbarContext.Provider>
    );
};