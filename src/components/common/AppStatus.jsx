import FallbackError from "@/features/fallback/FallbackError";
import FallbackNotContent from "@/features/fallback/FallbackNotContent";
import FallbackNotSearchResults from "@/features/fallback/FallbackNotSearchResults";
import FallbackServerDown from "@/features/fallback/FallbackServerDown";
import { healthService } from "@/features/health/services/healthService";
import { useAsync } from "@/hooks/useAsync";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CenterLayout from "@layout/CenterLayout";
import PageServerDown from "@/features/fallback/pages/PageServerDown";
import PageNotSearchResults from "@/features/fallback/pages/PageNotSearchResults";
import PageNotContent from "@/features/fallback/pages/PageNotContent";
import PageError from "@/features/fallback/pages/PageError";


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
      notSearchResults = false,
      isEmpty = false,
    }) => {


    const navigate = useNavigate()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { isOnline } = useNetworkStatus();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    /*const { serverStatus } = useCheckServer(isOnline);*/

    const serverStatus = useAsync( healthService.checkConnection )
    
    useEffect(()=>{
       serverStatus.execute()
    },[])


    // 1. -- Cargando contenido.
    if (loading) return (
      <div className="rounded mt-2 mb-5 pb-5 w-100">
          {placeholder}
      </div>);
    // 2. No conectado a internet ?
    // if (!isOnline) 
    //   return <PageIsOffline />
    // 3. Servidor caido
    if (serverStatus == 'servidor_caido') 
      return (
        <PageServerDown />
      )
    // 2. -- Error de carga de contenido
    if (error?.code === 'TOKEN_EXPIRED') {
      navigate('/home?dialog=expiredsession')
      return  <>{children}</>
    }

    if (error) 
      return (
       <PageError error={error} handle={onRetry} />
     ) 

    if(notSearchResults)
      return (<PageNotSearchResults />)
       

    // 3. No hay contenido
    if (isEmpty) 
      return (<PageNotContent />)
      
    return <>{children}</>
};
