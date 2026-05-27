
import { useSearchParams } from "react-router-dom";

/**
 * ParamGuard: Renderiza sus hijos solo si los parámetros de la URL 
 * cumplen con la lógica definida en el atributo 'param'.
 * 
 * Soporta:
 * - AND: "key=val&key2=val2" (ambos deben ser ciertos)
 * - OR:  "key=val||key2=val2" (al menos uno debe ser cierto)
 */

export default function ParamGuard({ children, param, inverse = false }) {
    const [searchParams] = useSearchParams();

    if (!param) return children;

    const orGroups = param.split("||"); // ["k0=v0||k1=v1"] -> ["k0=v0","k1=v1"]

    const evaluateGroup = (groupString) => {
    	// ["k0=v0&k1=v1"] -> ["k0=v0","k1=v1"]
        const conditions = groupString.split("&"); 

        return conditions.every(condition => {
            if (!condition.trim()) return true;

            // 1. Intentar separar por '='
            const parts = condition.split('=');
            const key = parts;// [k, val] o [k]
            
            // si no tiene value : pregunta si existe
            if (parts.length === 1) {
                return searchParams.has(key); 
            }

            const expectedValue = parts;
            const actualValue = searchParams.get(key);

            // si tiene key, value : pregunta si es param actual
            return actualValue === expectedValue;
        });
    };


    const matches = orGroups.some(evaluateGroup);

    // Si inverse es true, invertimos el resultado
    const shouldShow = inverse ? !matches : matches;

    return shouldShow ? children : null;

}