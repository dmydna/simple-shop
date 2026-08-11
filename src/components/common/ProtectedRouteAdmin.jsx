import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import Page403Forbidden from "@features/fallback/Page403Forbidden.jsx";
import PageLoading from "@features/fallback/PageLoading.jsx";
import RouteLayout from "./RouteLayout.jsx";


export default function ProtectedRouteAdmin({ children }) {
    const { isAuth, loading, isAdmin, renewSession, expiredDate  } = useAuthContext();

    // Mientras se verifica el token en localStorage, mostramos un spinner o nada
    if (loading) {
        return <PageLoading message='Cargando sesion...' />
    }

    // HACK: ide marca error con useEffect
    // const expiredDate = localStorage.getItem("expiredDate");
    
    if(expiredDate && Date.now() > expiredDate){
        renewSession();
    }

    return isAuth && isAdmin ? 
    <RouteLayout>
        {children}
    </RouteLayout> : 
    <Page403Forbidden />;
}
