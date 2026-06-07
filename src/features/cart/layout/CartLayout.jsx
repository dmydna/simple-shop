import PageError from "@/pages/fallback/PageError";
import { useEffect } from "react";
import CartEmpty from "../components/CartEmpty";
import PageSuccess from "../../../pages/fallback/PageSuccess";


/**
 * Componente principal que gestiona estados de carga, error, servidor y sin contenido en la App.
 * Renderiza componentes de estado específicos y muestra los hijos solo cuando
 * no hay carga, error ni éxito activo.
 *
*/


export const CartLayout = (
    { 
      children, 
      error, 
      setError,
      success, 
      setSuccess,
      isEmpty = false 
    }) => {

      


    useEffect(()=>{
      if(isEmpty){
        if(document.querySelector('main')){ 
          document.querySelector('main').classList.add('d-flex', 'justify-content-center', 'align-items-center') 
        }
      }else{
        if(document.querySelector('main')){ 
          document.querySelector('main').classList.remove('d-flex', 'justify-content-center', 'align-items-center') 
        }
      }
    },[isEmpty])


    if (success) return <PageSuccess handle={()=> setSuccess(null)} />
    if (error) return <PageError error={error} handle={ ()=> setError(null)} />
    if (isEmpty) return <CartEmpty /> 


    return <>{children}</>
};
