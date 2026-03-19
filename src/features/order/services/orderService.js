// src/services/orderService.js
import {TOKEN, BASE_URL,ENDPOINTS} from "../../../utils/config.js";
const ENDPOINT = ENDPOINTS.ORDER

export const orderService = {
    // GET ALL: Obtener todos los pedidos
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });
        if (!response.ok) throw new Error("Error al obtener pedidos");
        return await response.json();
    },

    // GET: Obtener un pedido por ID
    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });
        if (!response.ok) throw new Error("Pedido no encontrado");
        return await response.json();
    },

    // POST: Crear un nuevo pedido
    create: async (productData) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al crear pedido");
        return await response.json();
    },

    // POST: Crear a partir de una lista pedido
    createBulk: async (orderDataList) => {
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
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el pedido");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    }
};
