// src/services/orderService.js
import {mapToURLSearchParams, ENDPOINTS, ROLE, BASE_URL, TOKEN} from "../../../utils/config.js";
const ENDPOINT = ENDPOINTS.ORDER

export const orderService = {
    // GET ALL: Obtener todos los pedidos
    getAll: async () => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        if (!response.ok) throw new Error("Error al obtener pedidos");
        return await response.json();
    },

    // GET: Obtener un pedido por ID
    getById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        if (!response.ok) throw new Error("Pedido no encontrado");
        return await response.json();
    },

    // POST: Crear un nuevo pedido
    // solo recibe List<OrderDetailDTO>
    create: async (orderData, clientId) => {
        console.log("orderData:", JSON.stringify(orderData))
        const TOKEN = localStorage.getItem("token")
        const client = (clientId ? `?clientId=${clientId}` : '')
        const response = await fetch(`${BASE_URL}/${ENDPOINT}` + client,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify(orderData)
            });
        if (!response.ok) throw new Error("Error al crear pedido");
        return await response.json();
    },

    // POST: Crear a partir de una lista pedido
    createBulk: async (orderDataList) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(orderDataList)
        });
        if (!response.ok) throw new Error("Error al crear pedido");
        return await response.json();
    },

    // PUT: Actualiza pedido por ID
    update: async (id, orderData) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error("Error al actualizar pedido");
        return await response.json();
    },

    // DELETE: Eliminar un pedido por ID
    delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el pedido");
        }
        return response.status === 204 ?
            { success: true } : await response.json();
    },


    cancel: async (id) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/cancel/${id}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error("No se pudo cancelar el pedido");
        }
        return response.status === 204 ?
            { success: true } : await response.json();
    },


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
    }

}
