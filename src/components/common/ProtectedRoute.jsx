import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import PageLoading from "@features/fallback/PageLoading.jsx";
import RouteLayout from "@common/RouteLayout.jsx";

export default function ProtectedRoute({ children }) {
    
    const { isAuth, loading } = useAuthContext();
    // Mientras se verifica el token en localStorage, mostramos un spinner o nada
    if (loading) {
        return <PageLoading message='Cargando sesion...' />;
    }
    return isAuth ? 
        <RouteLayout>{children}</RouteLayout> : 
        <Navigate to="/login" />;
}
