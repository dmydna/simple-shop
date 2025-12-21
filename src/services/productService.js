// src/services/productService.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const productService = {
    // GET: Obtener todos los productos
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/api/products`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    },

    // GET: Obtener un producto por ID
    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    },

    // POST: Crear un nuevo producto
    create: async (productData) => {
        const response = await fetch(`${BASE_URL}/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    },

    // PUT: Actualiza producto por ID
    update: async (id, productData) => {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    },

    // DELETE: Eliminar un producto por ID
    delete: async (id) => {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    }
};