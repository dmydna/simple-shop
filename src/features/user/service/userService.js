// src/services/userService.js
import {mapToURLSearchParams, ENDPOINTS, ROLE, BASE_URL } from "../../../utils/config.js";
const ENDPOINT = ENDPOINTS.USER;

/* ------ ACCESO SOLO CON TOKEN ------- */
export const userService = {

    getPage : async ({ page = 0, size = 10, ...filters } = {}) => {
        // 1. Creamos un objeto plano para los parámetros

        const TOKEN = localStorage.getItem("token")
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters)

        console.log("-- URL con Parametros:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}` , {
            headers: {'Authorization': `Bearer ${TOKEN}`},
        });
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },

    /* ------------------------------------------- */
    // GET: Obtener un usuario por ID
    getById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error("usuario no encontrado");
        return await response.json();
    },


    getProfileById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/profile`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error("usuario no encontrado");
        return await response.json();
    },


    // DELETE: Eliminar un usuario por ID
    delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el usuario");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    },

    createBulk: async (userDataList) => {
            const TOKEN = localStorage.getItem("token")
            const response = await fetch(`${BASE_URL}/${ENDPOINT}/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + TOKEN
                },
                body: JSON.stringify(userDataList)
            });
            if (!response.ok) throw new Error("Error al crear producto");
            return await response.json();
    },

    updateStatus: async (id, status) => {
        // Pasa  visibilidad como un Query Parameter (?visibility=...)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/status?status=${status}`, {
            method: 'PATCH',
            headers: {
                // Agrega el header de autorización
                'Authorization': `Bearer ` + TOKEN
                // Nota: No es necesario 'Content-Type' porque no hay 'body'
            }
        });
    
        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "No se actualizó status");
        }
        return await response.json();
    },
};
