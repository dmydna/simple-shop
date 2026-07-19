import PageError from "@features/fallback/PageError";
import { useEffect } from "react";
import CartEmpty from "@features/cart/components/CartEmpty";
import PageSuccess from "@features/fallback/PageSuccess";


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

      
    // Nota: 
    // - El fallback solo responde en caso de Carrito Vacio. 
    // - Para fallbacks Success y Error se usa `MyCartLayout`.

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
    if (error) return   <PageError error={error} handle={ ()=> setError(null)} />
    if (isEmpty) return <CartEmpty /> 


    return <>{children}</>
};
