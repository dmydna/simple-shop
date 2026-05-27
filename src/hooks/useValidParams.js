// hooks/useValidParams.js
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useValidParams(validators, url) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    
    // Ejecutar todas las validaciones
    const invalidKeys = Object.keys(params).filter(key => {
      const validator = validators[key];
      return validator && !validator(params[key], params);
    });

    if (invalidKeys.length > 0) {
      // Crear nuevos params eliminando los inválidos o redirigiendo a base
      const newParams = new URLSearchParams();
      // Aquí decides si quieres limpiar solo los inválidos o resetear todo
      // Opción A: Resetear todo (más seguro)
      navigate(url?.redirect || "", { replace: true });
      
      // Opción B: Limpiar solo los inválidos (más amigable)
      // invalidKeys.forEach(key => params.delete(key));
      // navigate({ search: params.toString() }, { replace: true });
    }
  }, [searchParams, navigate, validators]);
}