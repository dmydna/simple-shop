// src/services/userService.js
import { mapToURLSearchParams } from "@utils/mappers.js" 
import { responseError } from "@/utils/service.js";
import { ENDPOINTS, BASE_URL } from "@utils/config.js";
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

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}` , {
            credentials: 'include',
            ...(TOKEN && {headers: {'Authorization': `Bearer ${TOKEN}`}}),
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    /* ------------------------------------------- */
    // GET: Obtener un usuario por ID
    getById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    getMe: async () => {
        console.log("AUTHENTICATION!")
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/me`, {
            credentials: 'include',
            ...(TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } })
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();        
    },


    getProfileById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/profile`, {
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },


    // DELETE: Eliminar un usuario por ID
    delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            ...(TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } })
        });

        if (!response.ok) {
            return responseError(response)
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
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    updateStatus: async (id, status) => {
        // Pasa  visibilidad como un Query Parameter (?visibility=...)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/status?status=${status}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
            // Agrega el header de autorización
                'Authorization': `Bearer ` + TOKEN
            // Nota: No es necesario 'Content-Type' porque no hay 'body'
            }
        });
    
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    banUser: async (id, banRequest) => {
        console.log(banRequest)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/ban-user`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + TOKEN
                },
                body: JSON.stringify(banRequest)
        });

        if (!response.ok) {
            return responseError(response)
        }
         // El backend siempre devuelve 200 OK con cuerpo vacío en éxito
        return { success: true };
    },
    

    unbanUser: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/unban-user`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ` + TOKEN
                },
        });
        if (!response.ok) {
            return responseError(response)
        }
         // El backend siempre devuelve 200 OK con cuerpo vacío en éxito
        return { success: true };
    },
    
};
