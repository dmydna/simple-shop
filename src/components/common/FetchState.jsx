import PageError from "@/pages/errors/PageError";
import PageSuccess from "@/pages/errors/PageSuccess";
import React, { useEffect } from 'react';
import PageLoading from "./PageLoading";
import FetchStateToast from "./FetchStateToast";
import FetchStateModal from "./FetchStateModal";

/**
 * Componente que gestiona estados de carga, error y éxito en una página.
 * Renderiza componentes de estado específicos y muestra los hijos solo cuando
 * no hay carga, error ni éxito activo.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido que se renderizará cuando no haya estados activos.
 * @param {Object} props.hook - El hook personalizado que provee el estado y las funciones de control.
 * @param {boolean} props.hook.loading - Indica si la página está cargando.
 * @param {string|null} props.hook.error - Mensaje de error o null si no hay error.
 * @param {function} props.hook.setError - Función para establecer o limpiar el error.
 * @param {boolean} props.hook.success - Indica si la operación fue exitosa.
 * @param {function} props.hook.setSuccess - Función para establecer o limpiar el estado de éxito.
 *
 * @returns {React.ReactElement} El componente renderizado.
 */
function FetchState({ children, hook }) {
    const { loading, error, setError, success, setSuccess } = hook;

    useEffect(()=>{
        setSuccess(false);
        setError(null);
    },[setError, setSuccess])


    if(loading) {return <PageLoading />};
    if(error)   {
        return (
            <PageError error={error}  handle={() => setError(null)} />
        )
    }
    if(success) {
        return (
            <PageSuccess handle={() => setSuccess(null)} />
        )

    }

    return <>{children}</>;
}


FetchState.Toast = FetchStateToast;
FetchState.Modal = FetchStateModal;
export default FetchState;
