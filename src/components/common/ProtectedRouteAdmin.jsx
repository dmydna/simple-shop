import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import Page403Forbidden from "@/pages/fallback/Page403Forbidden.jsx";
import PageLoading from "../../pages/fallback/PageLoading.jsx";
import RouteLayout from "./RouteLayout.jsx";

export default function ProtectedRouteAdmin({ children }) {
    const { isAuth, loading, isAdmin  } = useAuthContext();

    // Mientras se verifica el token en localStorage, mostramos un spinner o nada
    if (loading) {
        return <PageLoading message='Cargando sesion...' />
    }
    return isAuth && isAdmin ? 
    <RouteLayout>{children}</RouteLayout> : 
    <Page403Forbidden />;
}
