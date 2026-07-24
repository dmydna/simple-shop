import { mapToURLSearchParams } from "@utils/mappers.js"
import { ENDPOINTS, BASE_URL} from "@utils/config.js";
import {responseError} from "@utils/service"

const ENDPOINT = ENDPOINTS.REVIEWS

export const reviewService = {

    getById: async (id) => {

        const TOKEN = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/requests/${id}`,
            {
                credentials: 'include',
                ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } } )
            }
        );
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },


    // Nota: Obtiene los reviews Pendientes del usuario
    // no son reviews, son requests de review.
    getPage: async ({ page = 0 , size = 8, ...filters } = {}) => {

        const TOKEN = localStorage.getItem("token")
        // 1. Creamos un objeto plano para los parámetros
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters);

        console.log("URL Corregida:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/requests?${cleanParams.toString()}`,
            { 
                credentials: 'include',
                ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } } ) 
            }
        );
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },


    Delete: async (productId) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/requests/${productId}`, {
            method: 'DELETE',
            credentials: 'include',
            ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } } )
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response;
    },

    // solo admin
    deleteReview: async (productId) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${productId}`, {
            method: 'DELETE',
            credentials: 'include',
            ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } } )
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response;
    },


    // user
    createReview: async (reviewData) => {
        const formatData = { 
           "id": 0, 
           "reviewerName": "", 
           "reviewerEmail": "", 
           "rating": reviewData.rating,
           "comment": reviewData.comment, 
           "productId": reviewData.productId
         }

        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json', 
                ...( TOKEN && {'Authorization': `Bearer ${TOKEN}`} )
            }, 
            body: JSON.stringify(formatData) 
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    updateReview: async (id, data) => {
        // Pasa  visibilidad como un Query Parameter (?visibility=...)
        console.log(data)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data), 
            credentials: 'include',
            headers: {
                // Agrega el header de autorización
                'Content-Type': 'application/json',
                ...( TOKEN && {'Authorization': `Bearer ${TOKEN}`} )
            }
        });
    
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    }


}


