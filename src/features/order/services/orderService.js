// src/services/orderService.js
import { toCreateOrder, mapToURLSearchParams } from "@/utils/mappers.js";
import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { responseError } from "@/utils/service.js";
const ENDPOINT = ENDPOINTS.ORDER

export const orderService = {
    // GET ALL: Obtener todos los pedidos
    getAll: async () => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, 
           { 
                credentials: 'include',
                ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}`} } )
            }
        );
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    // GET: Obtener un pedido por ID
    getById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, 
            { 
                credentials: 'include',
                ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}`} } )
            }
        );
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    // POST: Crear un nuevo pedido
    // recibe CartItems
    create: async (data, clientId) => {
        const orderData = toCreateOrder(data)
        const TOKEN = localStorage.getItem("token")
        const client = (clientId ? `?clientId=${clientId}` : '')
        const response = await fetch(`${BASE_URL}/${ENDPOINT}` + client, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...(TOKEN && { 'Authorization': `Bearer ${TOKEN}`} )
                },
                body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    // POST: Crear a partir de una lista pedido
    createBulk: async (orderDataList) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/bulk`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && { 'Authorization': `Bearer ${TOKEN}`} )
            },
            body: JSON.stringify(orderDataList)
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    // PUT: Actualiza pedido por ID
    update: async (id, orderData) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && { 'Authorization': `Bearer ${TOKEN}`} )
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    // DELETE: Eliminar un pedido por ID
    delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}`} } )
        });

        if (!response.ok) {
            return responseError(response)
        }
        return response.status === 204 ?
            { success: true } : await response.json();
    },


    cancel: async (id) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/cancel/${id}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            return responseError(response)
        }
        return response.status === 204 ?
            { success: true } : await response.json();
    },


    getPage: async ({ page = 0 , size = 8, ...filters } = {}) => {

        const TOKEN = localStorage.getItem("token")
        // 1. Creamos un objeto plano para los parámetros
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page < 0 ? 0 : page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters);

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}`, 
            { 
                credentials: 'include',
                ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}`} } )
            }
        );

        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    }

}
