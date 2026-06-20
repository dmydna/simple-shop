import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext } from "react";
import {useAuth} from "@features/auth/hooks/useAuth.js";
import ModalParam from '@/components/common/ModalParam';
import ExpiredSession from '@/features/fallback/ExpiredSession';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null)

export function AuthProvider({ children }){

    const navigate = useNavigate();
    const authHook = useAuth()

    return (

        <AuthContext.Provider value={authHook}>
            {children}
        <ModalParam param="dialog=expiredsession">
          {(close) =>  <ExpiredSession  handle={()=> { 
            authHook?.logout(); 
            close(); 
            navigate('/')
        }}  /> }
        </ModalParam>
        </AuthContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);