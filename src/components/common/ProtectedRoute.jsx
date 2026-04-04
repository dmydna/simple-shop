import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/AuthContext.jsx";
import React from "react";
import PageLoading from "./PageLoading.jsx";

export default function ProtectedRoute({ children }) {
    const { isAuth, loading, isAdmin } = useAuth();
    // Mientras se verifica el token en localStorage, mostramos un spinner o nada
    if (loading) {
        return <PageLoading message='Cargando sesion...' />;
    }
    return isAuth ? children : <Navigate to="/login" />;
}
