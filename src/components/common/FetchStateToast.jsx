import PageLoading from "@features/fallback/PageLoading";
import { useEffect } from 'react';
import toast from 'react-hot-toast'; // Asegúrate de tener instalado el paquete o importar tu componente



export default function FetchStateToast({ children, hook }) {
    const { loading, error, setError, success, setSuccess } = hook;

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Ocurrió un error');
            setError(null); // Limpiar el error después de mostrarlo
        }
    }, [error, setError]);

    useEffect(() => {
        if (success) {
            toast.success('Operación exitosa');
            setSuccess(false); // Limpiar el estado de éxito
        }
    }, [success, setSuccess]);

    return (
        <>
            {loading && <PageLoading />}
            {!success && !error && !loading && children}
        </>
    );
}
