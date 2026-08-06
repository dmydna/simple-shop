import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext, useState } from "react";
import {useAuth} from "@features/auth/hooks/useAuth.js";
import ModalParam from '@/components/common/ModalParam';
import ExpiredSession from '@/features/fallback/ExpiredSession';
import { useNavigate } from 'react-router-dom';
import ModalLock from '@/components/common/ModalLock';

export const AuthContext = createContext(null)

export function AuthProvider({ children }){

    const navigate = useNavigate();
    const authHook = useAuth()

    const {logout} = authHook;
    const [show, setShow] = useState();

    const expiredSessionHandle = () => {
        setShow(false); logout(); navigate('/')
    }

    return (

        <AuthContext.Provider value={{...authHook, renewSession: () => setShow(true)}}>
            {children}
            <ModalLock show={show} close={setShow}>
                <ExpiredSession  handle={expiredSessionHandle}  />
            </ModalLock>
        </AuthContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);