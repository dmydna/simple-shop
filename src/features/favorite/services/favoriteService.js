
import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { mapToURLSearchParams } from "@utils/mappers.js";
import { responseError } from '@utils/service.js';
const ENDPOINT = ENDPOINTS.PROFILE + "/favorites"




export const favoriteService = {

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

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}`,
            { headers: { 'Authorization': `Bearer ${TOKEN}`} }
        );
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },

    create: async (listingId) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${listingId}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ` + TOKEN },
        });
        if (!response.ok) throw new Error("Error al agregar favorito");
        return await response.json();
    },


    isFavoriteProduct: async (listingId) => {
        console.log(listingId)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${listingId}/check`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ` + TOKEN},
        });
        if (!response.ok) {
            return responseError(response)
        }
        const data = await response.json();

        return data?.isFavorite;
    },    

    Delete: async (listingId) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${listingId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ` + TOKEN},
        });
        if (!response.ok) throw new Error("Error al borrar favorito");
        return await response;
    },

}

