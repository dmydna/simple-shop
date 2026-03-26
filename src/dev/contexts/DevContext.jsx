import React, { createContext, useContext } from "react";
import {useDev} from "../hooks/useDev.js";

export const DevContext = createContext(null)

export function DevProvider({ children }){

    const devHook = useDev()

    return (

        <DevContext.Provider value={devHook}>
            {children}
        </DevContext.Provider>
    
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDevContext = () => useContext(DevContext);