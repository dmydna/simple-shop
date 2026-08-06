// export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";


export const BASE_URL = import.meta.env.VITE_API_URL; 
export const BASE_URL_IMG = `${BASE_URL}/uploads` // https://cdn.dummyjson.com

export const ENDPOINTS = Object.freeze({
    DEV:       'dev', // incluye: dev/products, dev/listing, dev/users, dev/orders
    HEALTH:    'api/health',
    LISTING:   'api/listings',
    FAVORITE:  'api/favorites',
    PRODUCT:   'api/products',
    USER:      'api/users',
    ORDER:     'api/orders',
    AUTH:      'api/auth',
    BUY:       'api/buy',
    REVIEWS:   'api/reviews',
    STATS:     'api/stats',
    GATEWAY:   'toy-gateway', // pasarela de pago falsa.
    IMAGES:    'images',      // generador de imagen
    UPLOADS:   'uploads'      
})

export const DEV_ENPOINTS = Object.freeze({
    LISTINING : 'dev/listings',
    PRODUCT:    'dev/products',
    USER:       'dev/users',
    PROFILE:    'dev/profile',
})




