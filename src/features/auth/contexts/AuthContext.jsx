import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext, useState } from "react";
import {useAuth} from "@features/auth/hooks/useAuth.js";
import ModalParam from '@/components/common/ModalParam';
import ExpiredSession from '@/features/fallback/ExpiredSession';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '@/components/common/ModalConfirm';

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
            <ModalConfirm show={show} close={setShow}>
                <ExpiredSession  handle={expiredSessionHandle}  />
            </ModalConfirm>
        </AuthContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);