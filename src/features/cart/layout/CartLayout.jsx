import FallbackError from "@/features/fallback/components/FallbackError";
import FallbackSuccess from "@/features/fallback/components/FallbackSuccess";
import CartEmpty from "@features/cart/components/CartEmpty";


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


    if (success) return <FallbackSuccess handle={()=> setSuccess(null)} />
    if (error) return   <FallbackError error={error} handle={ ()=> setError(null)} />
    if (isEmpty) return <CartEmpty /> 


    return <>{children}</>
};
