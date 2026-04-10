

// src/services/config.js

// export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Nota: token y role pueden causar errores de sincronizacion entre sesiones,
// se deben mover a los metodos de services.

export const BASE_URL = "http://localhost:8080"
export const BASE_URL_IMG = `${BASE_URL}/uploads` // https://cdn.dummyjson.com
export const TOKEN = (() => localStorage.getItem("token"))();
export const ROLE  = (() => localStorage.getItem("role"))();

export const ENDPOINTS = Object.freeze({
    LISTENING: 'api/listing',
    PRODUCT:   'api/products',
    CLIENT:    'api/client',
    USER:      'api/users',
    ORDER:     'api/orders',
    AUTH:      'api/auth',
    PROFILE:   'api/profile',
    BUY:       'api/buy',
    REVIEWS:   'api/reviews',
    FAVORITE:  'api/profile/favorite',
    GATEWAY:   'toy-gateway', // pasarela de pago falsa.
    IMAGES:    'images',      // generador de imagen
    UPLOADS:   'uploads'      
})


export const mapToURLSearchParams = (urlParams, filters) => {
    Object.entries(filters).forEach(([key, value]) => {
        console.log(key, value);
        // Solo agregamos si el valor existe y no es un objeto/array vacío
        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value) && value.length > 0) {
                urlParams.append(key, value.join(','));
            } else if (!Array.isArray(value)) {
                urlParams.append(key, value);
            }
        }
    })

}



