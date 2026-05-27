// export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";


export const BASE_URL = "http://localhost:8080"
export const BASE_URL_IMG = `${BASE_URL}/uploads` // https://cdn.dummyjson.com

export const ENDPOINTS = Object.freeze({
    DEV:       'dev', // incluye: dev/products, dev/listing, dev/users, dev/orders
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





