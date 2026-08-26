import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import PageLoading from "@/features/fallback/pages/PageLoading.jsx";
import RouteLayout from "@common/RouteLayout.jsx";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    
    const { isAuth, loading, renewSession, expiredDate } = useAuthContext();


    if (loading) {
        return <PageLoading message='Cargando sesion...' />;
    }
    
    if(expiredDate && Date.now() > expiredDate){
            renewSession();
    }
   

    window.scrollTo({ top: 0, behavior: 'instant'});


    return isAuth ? 
        <RouteLayout>
            {children}
        </RouteLayout> : 
        <Navigate to="/login" />;
}
