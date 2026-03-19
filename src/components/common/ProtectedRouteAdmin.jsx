import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/AuthContext.jsx";
import NotFound from "../../pages/NotFound.jsx";
import Page403Forbidden from "../../pages/Page403Forbidden.jsx";
import React from "react";
import PageLoading from "../../pages/PageLoading.jsx";

export default function ProtectedRouteAdmin({ children }) {
    const { isAuth, loading, role, isAdmin  } = useAuth();

    // Mientras se verifica el token en localStorage, mostramos un spinner o nada
    if (loading) {
        return <PageLoading message='Cargando sesion...' />
    }
    return isAuth && isAdmin ? children : <Page403Forbidden />;
}
