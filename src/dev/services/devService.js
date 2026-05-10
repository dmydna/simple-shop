// src/dev/services/devService.js

import {mapToURLSearchParams, ENDPOINTS, ROLE, BASE_URL, TOKEN} from "@/utils/config.js";
const ENDPOINT = ENDPOINTS.DEV;

/* ========= HTTP ==========
  - 1XX (Información)
  - 2XX (Éxito)
  - 3XX (Redirección)
  - 4XX (Error del cliente)
  - 5XX (Error del servidor)
 ========================= */

export const devService = {

    /** Se admiten los siguientes type: 
     * 0. auth
     * 1. listing
     * 2. product
     * 3. user
    */

    // crea dada una lista
    createBulk: async (type, productData) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${type}/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error(`Error los ${type}s no fueron creados`);
        return await response.json();
    },

    // devuelve lista paginada
    getPage : async (type, { page = 0, size = 10, ...filters } = {}) => {

        const TOKEN = localStorage.getItem("token")
        // 1. Creamos un objeto plano para los parámetros
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters);

        console.log("URL Corregida:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${type}?${cleanParams.toString()}`,    
             { 'Authorization': `Bearer ${TOKEN}`}
            );
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },


};
