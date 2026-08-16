import { arrayToDate } from "@utils/mappers";


export async function responseError(response) {
    
    let errorData = {};
    let errorMessage = "Error desconocido del servidor";

    // 1. Leer el cuerpo UNA SOLA VEZ
    // Intentamos JSON primero
    try {
        errorData = await response.json();
        // console.log(errorData)
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
    // console.log("Error capturado en service:", response);
    
    // 4. Lanzar el error (esto interrumpe el flujo de banUser)
    throw customError;
}


export const responseOK = async (response) => {
    // 1. Manejar respuestas exitosas sin cuerpo (204 No Content, 205 Reset Content)
    if (response.status === 204 || response.status === 205) {
        return { success: true, data: null };
    }

    const contentType = response.headers.get("content-type") || "";

    let data = null;

    try {
        // 2. Parsear el cuerpo según el Content-Type reportado por el servidor
        if (contentType.includes("application/json")) {
            data = await response.json();
        } else if (contentType.includes("text/")) {
            data = await response.text();
        } else {
            // Si es un binario (blob/file) u otro tipo de dato no especificado
            data = await response.blob();
        }
    } catch (parseError) {
        // Fallback: si falla el parseo (ej: decía ser JSON pero venía vacío o corrupto)
        data = null;
    }

    return { success: true, data };
};


export const responseHandler = async (response, debug = null) => {
    if (!response.ok) {
        console.error(
            `${debug?.path && (`[FAIL]${debug?.method && (`[${debug.method}]`)} ${debug.path}`)}`   
        ) 
        return responseError(response); 
    }
    
    if(debug?.path){          
        console.info(
            `${debug?.path && (`[OK]${debug?.method && (`[${debug.method}]`)} ${debug.path}`)}` 
        ) 
    } 
    
    return responseOK(response);
};
