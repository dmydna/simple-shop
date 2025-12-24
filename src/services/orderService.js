// src/services/orderService.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const orderService = {
    // GET ALL: Obtener todos los pedidos
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/api/orders`);
        if (!response.ok) throw new Error("Error al obtener pedidos");
        return await response.json();
    },

    // GET: Obtener un pedido por ID
    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/api/orders/${id}`);
        if (!response.ok) throw new Error("Pedido no encontrado");
        return await response.json();
    },

    // POST: Crear un nuevo pedido
    create: async (productData) => {
        const response = await fetch(`${BASE_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al crear pedido");
        return await response.json();
    },

    // POST: Crear a partir de una lista pedido
    createBulk: async (orderDataList) => {
        const response = await fetch(`${BASE_URL}/api/orders/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDataList)
        });
        if (!response.ok) throw new Error("Error al crear pedido");
        return await response.json();
    },

    // PUT: Actualiza pedido por ID
    update: async (id, orderData) => {
        const response = await fetch(`${BASE_URL}/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error("Error al actualizar pedido");
        return await response.json();
    },

    // DELETE: Eliminar un pedido por ID
    delete: async (id) => {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el pedido");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    }
};
