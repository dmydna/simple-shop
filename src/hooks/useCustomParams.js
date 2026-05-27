import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";


export const useCustomParams = () => {


  const [searchParams, setSearchParams] = useSearchParams();

  // Estado de solo lectura derivado de la URL
  const params = useMemo(() => {
    const obj = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  const updateParams = useCallback((updater) => {

    setSearchParams((prevParams) => {
      // Convertir URLSearchParams a objeto para usar el patrón spread
      const currentObj = Object.fromEntries(prevParams);
      
      // Aplicar el updater (función o objeto directo)
      const nextObj = typeof updater === 'function' 
        ? updater(currentObj) 
        : updater;

      const newSearchParams = new URLSearchParams();

      Object.entries(nextObj).forEach(([key, value]) => {

        console.log([key, value])

        if (value === null || value === undefined) {
          // Si es null/undefined, no lo agregamos (efecto de eliminar)
          // Nota: URLSearchParams no tiene .delete() en el constructor, 
          // solo agregamos lo que queremos mantener
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

    console.log(newSearchParams)
      return newSearchParams;
    });
  }, []);

  return { 
    "searchParams":params, 
    "setSearchParams":updateParams };
};