import {mapToURLSearchParams, ENDPOINTS, ROLE, BASE_URL, TOKEN} from "../../../utils/config.js";
const ENDPOINT = ENDPOINTS.REVIEWS

export const reviewService = {

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

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/pending-review?${cleanParams.toString()}`,
            { headers: { 'Authorization': `Bearer ${TOKEN}`} }
        );
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },


    Delete: async (productId) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/pending-review/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ` + TOKEN},
        });
        if (!response.ok) throw new Error("Error al borrar request review");
        return await response;
    },

    // solo admin
    deleteReview: async (productId) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ` + TOKEN},
        });
        if (!response.ok) throw new Error("Error al borrar review");
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
        console.log(formatData)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ` + TOKEN, 'Content-Type': 'application/json' },

            body: JSON.stringify(formatData) 
        });
        if (!response.ok) throw new Error("Error al crear review");
        return await response;
    },

}


