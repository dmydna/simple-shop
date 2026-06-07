import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext } from "react";
import {useAuth} from "@features/auth/hooks/useAuth.js";

export const AuthContext = createContext(null)

export function AuthProvider({ children }){

    const authHook = useAuth()

    return (

        <AuthContext.Provider value={authHook}>
            {children}
        </AuthContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);