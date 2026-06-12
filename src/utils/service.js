import { arrayToDate } from "./mappers";


export async function responseError(response) {
    
    let errorData = {};
    let errorMessage = "Error desconocido del servidor";

    // 1. Leer el cuerpo UNA SOLA VEZ
    // Intentamos JSON primero
    try {
        errorData = await response.json();
        console.log(errorData)
        // Extraemos mensaje si existe
        if (errorData.message) errorMessage = errorData.message;
        else if (errorData.error) errorMessage = errorData.error;
    } catch (e) {
        // Si falla JSON, leemos como texto
        try {
            const text = await response.text();
            errorMessage = text || `Error HTTP ${response.status}`;
            errorData = { message: errorMessage };
        } catch (textErr) {
            // Si falla todo, usamos el status
            errorMessage = `Error HTTP ${response.status}`;
        }
    }

    // 2. Crear el error personalizado
    const customError = new Error(errorMessage);
    
    // 3. Inyectar metadatos de forma SEGURA
    customError.status = response.status;
    customError.path = response.url;
    
    // Formatear timestamp SOLO si existe y es un array válido
    if (errorData.timestamp && Array.isArray(errorData.timestamp)) {
        customError.timestamp = arrayToDate(errorData.timestamp);
    } else {
        customError.timestamp = new Date().toISOString(); // Fecha actual como fallback
    }

    customError.rawData = errorData;
    customError.cause = errorData;
    customError.code = errorData.code

    console.error("Error capturado en service:", customError);
    console.log("Error capturado en service:", response);
    
    // 4. Lanzar el error (esto interrumpe el flujo de banUser)
    throw customError;
}



export const responseFetch = async (response) => {
    if (!response.ok) {
        return responseError(response); 
    }
    return await response.json();
};
