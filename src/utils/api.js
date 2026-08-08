import {arrayToDate} from "@utils/mappers.js"

export const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Cliente HTTP base sobre Fetch API
 */
export const apiFetch = async (endpoint, { method = 'GET', body = null, headers = {}, params = null } = {}) => {
  const token = localStorage.getItem("token");

  // 1. Construir URL con Query Parameters si existen (ideal para GET)
  let url = `${BASE_URL}/${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params).toString();
    url += `?${searchParams}`;
  }

  const isFormData = body instanceof FormData;

  // 2. Encabezados por defecto
  const defaultHeaders = {
    // Solo agregar JSON si NO es FormData y SÍ hay un body
    ...(!isFormData && body && { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...headers,
  };
  
  const config = {
    method,
    headers: defaultHeaders,
    credentials: 'include',
    // Si es FormData se pasa tal cual, si es objeto JS se convierte a JSON string
    ...(body && { 
      body: isFormData ? body : (typeof body === 'string' ? body : JSON.stringify(body)) 
    }),
  };

  try {
    const response = await fetch(url, config);
    return await responseHandler(response, { method, endpoint });
  } catch (error) {
    // Captura errores de RED (sin conexión, CORS, timeout)
    if (error.name !== 'CustomAPIError') {
      console.error(`[NETWORK ERROR] [${method}] ${endpoint}:`, error);
    }
    throw error;
  }
};

/**
 * Atajos sintácticos organizados por semántica HTTP
 */
export const api = {
  get: (endpoint, params = null, config = {}) => 
    apiFetch(endpoint, { method: 'GET', params, ...config }),

  post: (endpoint, body = null, config = {}) => 
    apiFetch(endpoint, { method: 'POST', body, ...config }),

  put: (endpoint, body = null, config = {}) => 
    apiFetch(endpoint, { method: 'PUT', body, ...config }),

  patch: (endpoint, body = null, config = {}) => 
    apiFetch(endpoint, { method: 'PATCH', body, ...config }),

  delete: (endpoint, config = {}) => 
    apiFetch(endpoint, { method: 'DELETE', ...config }),
};

/**
 * Procesador de respuestas con error (HTTP 4xx / 5xx)
 */
export async function responseError(response) {
  let errorData = {};
  let errorMessage = "Error desconocido del servidor";

  try {
    errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch {
    try {
      const text = await response.text();
      errorMessage = text || `Error HTTP ${response.status}`;
      errorData = { message: errorMessage };
    } catch {
      errorMessage = `Error HTTP ${response.status}`;
    }
  }

  const customError = new Error(errorMessage);
  customError.name = 'CustomAPIError';
  customError.status = response.status;
  customError.path = response.url;
  customError.code = errorData.code || null;
  customError.rawData = errorData;

  // Formateador seguro de timestamp
  if (errorData.timestamp && Array.isArray(errorData.timestamp)) {
    customError.timestamp = arrayToDate(errorData.timestamp);
  } else {
    customError.timestamp = errorData.timestamp || new Date().toISOString();
  }

  console.error(`[API ERROR ${response.status}]:`, errorMessage, customError);
  throw customError;
}

/**
 * Procesador de respuestas exitosas (HTTP 2xx)
 */
export const responseOK = async (response) => {
  // Respuestas sin contenido
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    if (contentType.includes("text/")) {
      return await response.text();
    }
    return await response.blob();
  } catch {
    return null;
  }
};

/**
 * Handler orquestador
 */
export const responseHandler = async (response, debug = {}) => {
  const logPrefix = `[${debug.method || 'REQ'}] ${debug.endpoint || response.url}`;

  if (!response.ok) {
    console.groupCollapsed(`[FAIL] ${logPrefix}`);
    console.log(response.url);
    console.trace();
    console.groupEnd();
    return await responseError(response);
  }

  if (debug.endpoint) {
    console.groupCollapsed(`[OK] ${logPrefix}`);
    console.log(response.url);
    console.trace();
    console.groupEnd();
  }

  return await responseOK(response);
};