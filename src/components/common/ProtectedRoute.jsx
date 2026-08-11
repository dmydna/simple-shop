import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import PageLoading from "@features/fallback/PageLoading.jsx";
import RouteLayout from "@common/RouteLayout.jsx";
import ModalParam from "./ModalParam";
import ExpiredSession from "@/features/fallback/ExpiredSession";
import { useEffect, useMemo } from "react";

export default function ProtectedRoute({ children }) {
    
    const { isAuth, loading, renewSession, expiredDate } = useAuthContext();


    if (loading) {
        return <PageLoading message='Cargando sesion...' />;
    }
    
    if(expiredDate && Date.now() > expiredDate){
            renewSession();
    }
   

    return isAuth ? 
        <RouteLayout>
            {children}
        </RouteLayout> : 
        <Navigate to="/login" />;
}
