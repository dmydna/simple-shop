// src/services/clientService.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const clientService = {
    // GET ALL: Obtener todos los clientes
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/api/clients`);
        if (!response.ok) throw new Error("Error al obtener clientes");
        return await response.json();
    },

    // GET: Obtener un Cliente por ID
    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/api/clients/${id}`);
        if (!response.ok) throw new Error("Cliente no encontrado");
        return await response.json();
    },

    // POST: Crear un nuevo Cliente
    create: async (clientData) => {
        const response = await fetch(`${BASE_URL}/api/clients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error("Error al crear cliente");
        return await response.json();
    },

    // POST: Crear a partir de una lista Cliente
    createBulk: async (clientDataList) => {
        const response = await fetch(`${BASE_URL}/api/clients/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientDataList)
        });
        if (!response.ok) throw new Error("Error al crear cliente");
        return await response.json();
    },

    // PUT: Actualiza Cliente por ID
    update: async (id, clientData) => {
        const response = await fetch(`${BASE_URL}/api/clients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error("Error al actualizar cliente");
        return await response.json();
    },

    // DELETE: Eliminar un Cliente por ID
    delete: async (id) => {
        const response = await fetch(`${BASE_URL}/api/clients/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el cliente");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    }
};
