import React, { createContext, useContext } from "react";
import {useUser} from "../hooks/useUser.js";


export const UserContext = createContext(null)

export function UserProvider({ children }){

    const userHook = useUser()

    return (
        
        <UserContext.Provider value={userHook}>
            {children}
        </UserContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);

