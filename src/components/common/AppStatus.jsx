import useCheckServer from "@/hooks/useCheckServer";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import PageError from "@/pages/errors/PageError";
import PageIsOffline from "@/pages/errors/PageIsOffline";
import PageServerDown from "@/pages/errors/PageServerDown";
import PageNotContent from "@pages/errors/PageNotContent";



/**
 * Componente principal que gestiona estados de carga, error, servidor y sin contenido en la App.
 * Renderiza componentes de estado específicos y muestra los hijos solo cuando
 * no hay carga, error ni éxito activo.
 *
*/


export const AppStatus = (
    { 
      children, 
      loading, 
      error, 
      onRetry, 
      placeholder, 
      isEmpty = false 
    }) => {

      

    const { isOnline } = useNetworkStatus();
    const { serverStatus } = useCheckServer()

    // 1. -- Cargando contenido.
    if (loading) return <>{placeholder}</>;
    // 2. No conectado a internet ?
    if (!isOnline) return <PageIsOffline />
    // 3. Servidor caido
    if (serverStatus === 'servidor_caido') return (<PageServerDown />)
    // 2. -- Error de carga de contenido
    if (error) return <PageError error={error} handle={onRetry} />
    // 3. No hay contenido
    if (isEmpty) return <PageNotContent /> 

    return <>{children}</>
};
