import useCheckServer from "@/hooks/useCheckServer";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { useUrlState } from "@/hooks/useUrlState";
import PageError from "@features/fallback/PageError";
import PageIsOffline from "@features/fallback/PageIsOffline";
import PageNotContent from "@features/fallback/PageNotContent";
import PageServerDown from "@features/fallback/PageServerDown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
      isEmpty = false,
    }) => {


    const navigate = useNavigate()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOnline } = useNetworkStatus();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { serverStatus } = useCheckServer();


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{

      // Agrega estilos al main de la App para centrar los Fallbacks
      if(!isOnline || serverStatus == 'servidor_caido' || isEmpty || error){
        if(document.querySelector('main')){ 
          document.querySelector('main')
            .classList.add('d-flex', 'justify-content-center', 'align-items-center') 
        }
      }else{
        if(document.querySelector('main')){ 
          document.querySelector('main')
            .classList.remove('d-flex', 'justify-content-center', 'align-items-center') 
        }
      }
      if(loading) {
        if(document.querySelector('main')){ 
          document.querySelector('main')
            .classList.remove('d-flex', 'justify-content-center', 'align-items-center') 
        }
      };
    },[isOnline,serverStatus, error, isEmpty, loading])


    

    // 1. -- Cargando contenido.
    if (loading) return (
      <div className="rounded mt-2 mb-5 pb-5 w-100">
          {placeholder}
      </div>);
    // 2. No conectado a internet ?
    if (!isOnline) 
      return <PageIsOffline />
    // 3. Servidor caido
    if (serverStatus === 'servidor_caido') 
      return (<PageServerDown />)
    // 2. -- Error de carga de contenido
    if (error?.code === 'TOKEN_EXPIRED') {
      navigate('/home?dialog=expiredsession')
      return  <>{children}</>
    }

    if (error) 
      return <PageError error={error} handle={onRetry} />
    // 3. No hay contenido
    if (isEmpty) 
      return <PageNotContent /> 

    return <>{children}</>
};
